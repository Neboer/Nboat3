// 检查bbs的访问地址是否符合要求。
export default async function (ctx) {
  const page = parseInt(ctx.query.page)
  if (isNaN(page)) { // 如果用户的请求没有带页码
    ctx.redirect(ctx.route.fullPath, { page: 1 })// 重定向到第一页
  } else { // 如果用户请求带有页码，则检查页码是否合法。
    const { total_page } = await ctx.$axios.$get('/bbs/pages')
    if (page > total_page) {
      ctx.error({
        statusCode: 404,
        message: '你访问的页码不存在'
      })
    } else {
      return total_page
    }
  }
}
