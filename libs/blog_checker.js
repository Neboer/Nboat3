// 拦截访问“博客”页的请求，提前检测请求是否合法，如果不合法提前404。对于合法的请求，将请求的博文对象绑定到ctx上供fetch()渲染。
// 这个中间件适用于pages/blog/_blog_id下的所有子页面。
export default async function (ctx) {
  function err_404 (description) {
    ctx.error({
      statusCode: 404,
      message: description || '你访问的页面不存在'
    })
  }

  const index = parseInt(ctx.query.index)
  const admin = ctx.store.state.admin
  const blog_id = ctx.route.params.blog_id
  const valid_id = (/^[0-9a-fA-F]{24}$/i).test(blog_id)
  if (['blog-blog_id-metaEditor'].includes(ctx.route.name) && (!admin)) {
    err_404()
  } else if (!valid_id) {
    err_404()
  } else {
    let blog_content
    try {
      blog_content = await ctx.$axios.$get('/blog/' + blog_id)
    } catch (e) {
      if (e) { // 博客加载出错，可能是请求了非法的目标
        err_404()
      }
    }
    if (!blog_content) {
      err_404()
    } else if ((!blog_content.visible) && (!admin)) {
      err_404()
    } else if (blog_content.blog_type && isNaN(index)) {
      ctx.redirect(ctx.route.fullPath, { index: blog_content.article[0].index })
    } else {
      if (blog_content.blog_type) {
        // 对于大博文，查找用户所选的页码是否存在，以及如果页码存在，将博文内容传递下去。
        const target_article = blog_content.article.find(val => val.index === index)
        if (!target_article) {
          err_404()
        }
      }
      return blog_content
    }

  }
}
