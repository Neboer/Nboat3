export default async function (ctx) {
  if (ctx.query && ctx.query.page) {
    const user_page = Number.parseInt(ctx.query.page)
    const { total_page } = await ctx.$axios.$get('/total_page')
    if (user_page >= 0 && user_page <= total_page) {
      return total_page
    } else {
      ctx.error({
        statusCode: 404,
        message: '页面不存在'
      })
    }
  } else {
    ctx.redirect('/list?page=1')
    return
  }
}
