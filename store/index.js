export default {
  state: () => {
    return {
      admin: false,
      blog_content: {},
      total_page: 1
    }
  },
  mutations: {
    upgrade (state) {
      state.admin = true
    },
    downgrade (state) {
      state.admin = false
    },
    set_blog (state, blog_content) {
      state.blog_content = blog_content
    },
    set_total_page (state, total_page) {
      state.total_page = total_page
    }
  },
  actions: {
    nuxtServerInit ({ commit }, ctx) {
      if (ctx.$cookies.get('secret') === process.env.secret) {
        commit('upgrade')
      } else if (ctx.req.url === '/' + process.env.secret) {
        ctx.$cookies.set('secret', process.env.secret)
        ctx.redirect(302, '/')
      }
    }
  }
}
