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
      if (ctx.$cookies.get('secret') === this.$config.secret) {
        commit('upgrade')
      } else if (ctx.req.url === '/' + this.$config.secret) {
        ctx.$cookies.set('secret', this.$config.secret)
        ctx.redirect(302, '/')
      }
    }
  }
}
