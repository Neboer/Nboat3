<template>
  <div>
    <div v-html="HTML"/>
    <nuxt-link v-if="$nuxt.context.store.state.admin" :to="{name: 'edit_homepage'}">
      <font-awesome-icon :icon="['fas','cog']"/>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  async asyncData (ctx) {
    return await ctx.$axios.$get(`/homepage?lang=${['zh', 'en', 'ja'].includes(ctx.query.lang) ? ctx.query.lang : 'zh'}`)
  },
  head: {
    title: 'Neboer\'s Boat',
    meta: [
      {
        name: 'Neboer的个人站',
        content: 'Neboer的主页，基本介绍'
      }
    ]
  }
}
</script>
