import { Router } from 'express'
import { celebrate } from 'celebrate'
import { get_blog_list, get_document_count } from '../db/blog/list'
import {
  schema_article_index_loose,
  schema_blog_id,
  schema_only_admin,
  schema_page,
  schema_single_article
} from '../schema'
import { get_blog_by_id } from '../db/blog/get'
import {
  increase_blog_total_visitor, update_article_content_by_id,
  update_blog_by_id,
  upgrade_small_blog_to_big_blog_by_hex_id
} from '../db/blog/update'
import { add_article_to_big_blog_by_id, create_big_blog, create_simple_blog } from '../db/blog/create'
import { remove_article_from_big_blog, remove_blog } from '../db/blog/delete'
import { get_match_and_modify } from '../response'

export const blog_router = Router()

export async function get_blog_page_count (include_visible) {
  const count = await get_document_count(include_visible)
  return Math.ceil(count / 5)
}

blog_router.get('/total_page', async (req, res) => {
  res.send({ total_page: await get_blog_page_count(req.admin) })
})

blog_router.get('/article', celebrate({ ...schema_page }), async (req, res) => {
  res.send((await get_blog_list((req.query.page - 1) * 5, 5, req.admin)))
})

blog_router.get('/blog/:blog_id', celebrate({ ...schema_blog_id }), async (req, res, next) => {
  try {
    const blog_content = await get_blog_by_id(req.params.blog_id)
    if (blog_content) {
      if (req.admin || blog_content.visible) {
        res.send(blog_content)
        if (!req.admin) {
          await increase_blog_total_visitor(req.params.blog_id)
        }
      } else {
        res.status(404).end()
      }
    } else {
      res.status(404).end()
    }
  } catch (e) {
    next(e)
  }
})

blog_router.post('/newBlog', celebrate({ ...schema_only_admin }), async (req, res) => {
  let created_blog_id = ''
  if (req.body.blog_type) { // 大博文
    created_blog_id = await create_big_blog(req.body)
  } else { // 小博文！
    created_blog_id = await create_simple_blog(req.body)
  }
  res.send({ blog_id: created_blog_id })
})

blog_router.put('/blog/:blog_id', celebrate({ ...schema_only_admin, ...schema_blog_id }), async (req, res, next) => {
  // 可以修改大小博文的meta，也可以用来修改大小博文的文章内容。
  try {
    if (typeof req.body.blog_type !== 'undefined') {
      // 有blog_type属性，说明是修改meta data。
      const ori_blog_content = await get_blog_by_id(req.params.blog_id)
      if (req.body.blog_type && (ori_blog_content.blog_type !== req.body.blog_type)) {
        // 需要先把小博文变成大博文，然后再修改meta
        await upgrade_small_blog_to_big_blog_by_hex_id(req.params.blog_id)
      }
      await update_blog_by_id(req.params.blog_id, req.body)
    } else {
      // 无此属性，说明是修改文章内容，大小博文在数据库函数里判断。
      await update_article_content_by_id(req.params.blog_id, req.body, parseInt(req.query.index))
    }
    res.end()
  } catch (e) {
    next(e)
  }
})

blog_router.post('/blog/:blog_id', celebrate({ ...schema_only_admin, ...schema_blog_id, ...schema_single_article }),
  async (req, res, next) => {
    try {
      await add_article_to_big_blog_by_id(req.params.blog_id, req.body)
      res.send({})
    } catch (e) {
      next(e)
    }
  }
)

blog_router.delete('/blog/:blog_id', celebrate({ ...schema_only_admin, ...schema_blog_id, ...schema_article_index_loose }),
  async function (req, res, next) {
    let result
    try {
      if (Number.isInteger(req.query.index)) {
        // 请求带index说明是删除大博文中的小文章，不带index说明是删除整个文章。
        result = await remove_article_from_big_blog(req.params.blog_id, req.query.index)
      } else {
        result = await remove_blog(req.params.blog_id)
      }
      res.send(get_match_and_modify(result))
    } catch (e) {
      next(e)
    }
  })
