import { get_all_visible_blog } from './db/blog/list'
import { get_blog_page_count } from './routes/blog'
import { bbs_total_pages } from './routes/bbs'

export async function blog_list_addr_generator () {
  const blog_list = await get_all_visible_blog()
  const result_list = []
  blog_list.forEach(blog => {
    if (blog.blog_type) { // 如果是大博文
      blog.article.forEach(article => {
        result_list.push(`/blog/${blog._id}?index=${article.index}`)
      })
    } else {
      result_list.push(`/blog/${blog._id}`)
    }
  })
  return result_list
}

export async function list_and_bbs_addr_generator () {
  const result_list = []
  const blog_page = await get_blog_page_count()
  const bbs_page = await bbs_total_pages()

  function add_page (prefix, max_page) {
    for (let i = 1; i <= max_page; i++) {
      result_list.push(`${prefix}${i}`)
    }
  }

  add_page('/list?page=', blog_page)
  add_page('/wall?page=', bbs_page)
  return result_list
}
