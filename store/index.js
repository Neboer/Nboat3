export default {
  state: () => {
    return {
      admin: false
    }
  },
  mutations: {
    upgrade (state) {
      state.admin = true
    },
    downgrade (state) {
      state.admin = false
    }
  },
  actions: {
    nuxtServerInit ({ commit }, ctx) {
      if (ctx.$cookies.get('secret') === CONFIG.secret) {
        commit('upgrade')
      } else if (ctx.req.url === '/' + CONFIG.secret) {
        ctx.$cookies.set('secret', CONFIG.secret)
        ctx.redirect(302, '/')
      }
    }
  }
}
