import express from 'express'
import { json } from 'body-parser'
import { celebrate } from 'celebrate'
import cookieParser from 'cookie-parser'
import { create_simple_blog, create_big_blog, add_article_to_big_blog_by_id } from './db/blog/create'
import { init } from './db/connection'
import {
  update_blog_by_id,
  upgrade_small_blog_to_big_blog_by_hex_id,
  update_article_content_by_id, increase_blog_total_visitor
} from './db/blog/update'
import { get_blog_list, get_document_count } from './db/blog/list'
import { get_blog_by_id } from './db/blog/get'
import { remove_blog, remove_article_from_big_blog } from './db/blog/delete'
import { schema_article_index_loose, schema_blog_id, schema_only_admin, schema_single_article } from './schema'
import { get_match_and_modify } from './response'

const app = express()

init()

app.use(json())
app.use(cookieParser())
app.use((req, res, next) => {
  req.admin = req.cookies.secret === process.env.secret
  next()
})

app.get('/total_page', async (req, res) => {
  const count = await get_document_count(req.admin)
  res.send({ total_page: Math.ceil(count / 5) })
})

app.get('/article', async (req, res) => {
  const page = parseInt(req.query.page)
  res.send((await get_blog_list((page - 1) * 5, 5, req.admin)))
})

app.get('/blog/:blog_id', celebrate({ ...schema_blog_id }), async (req, res, next) => {
  try {
    await increase_blog_total_visitor(req.params.blog_id)
    res.send(await get_blog_by_id(req.params.blog_id))
  } catch (e) {
    next(e)
  }
})

app.post('/newBlog', celebrate({ ...schema_only_admin }), async (req, res) => {
  let created_blog_id = ''
  if (req.body.blog_type) { // 大博文
    created_blog_id = await create_big_blog(req.body)
  } else { // 小博文！
    created_blog_id = await create_simple_blog(req.body)
  }
  res.send({ blog_id: created_blog_id })
})

app.put('/blog/:blog_id', celebrate({ ...schema_only_admin, ...schema_blog_id }), async (req, res, next) => {
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

app.post('/blog/:blog_id', celebrate({ ...schema_only_admin, ...schema_blog_id, ...schema_single_article }),
  async (req, res, next) => {
    try {
      await add_article_to_big_blog_by_id(req.params.blog_id, req.body)
      res.send({})
    } catch (e) {
      next(e)
    }
  }
)

app.delete('/blog/:blog_id', celebrate({ ...schema_only_admin, ...schema_blog_id, ...schema_article_index_loose }),
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

app.use(function (err, req, res, next) {
  console.error(err.details)
  res.status(500).send('Something broke!')
})

export default app
