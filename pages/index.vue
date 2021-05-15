<template>
  <div>
    <div v-html="HTML"/>
    <nuxt-link :to="{name: 'edit_homepage'}" v-if="$nuxt.context.store.state.admin">
      <font-awesome-icon :icon="['fas','cog']"/>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  async asyncData (ctx) {
    return await ctx.$axios.$get('/homepage?lang=zh')
  }
}
</script>
