<template>
  <div>
    <div style="width: fit-content;text-align: center;margin: 3rem auto">
      <font-awesome-icon :icon="['fas', 'satellite']" class="big-bomb"/>
      <div style="font-size: 5em; color: red">404</div>
      <div style="font-size: 3em">你所访问的页面不存在</div>
      <nuxt-link to="/">返回首页</nuxt-link>
      <div>{{ error }}</div>
    </div>
  </div>
</template>

<script>

export default {
  // layout: 'default',
  props: ['error']
}
</script>

<style scoped>
.big-bomb {
  font-size: 10em;
  color: gray;
}
</style>
