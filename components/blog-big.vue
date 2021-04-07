<template>
  <!-- 大博文。-->
  <!-- 大博文一次只能展示一篇小文章，通过翻页切换。-->
  <div>
    <img :src="content.big_cover" alt="dummy" class="d-block m-auto mw-100">

    <article class="markdown-body entry-content container-lg" itemprop="text">
      <h1 id="neboersboat">
        {{ content.title }}
        <div class="d-inline-block" style="font-size: large">
          <b-badge v-for="(itag, i) in content.tags" :key="i" class="mx-2" variant="primary">{{ itag }}</b-badge>
          <span><font-awesome-icon :icon="['fas', 'eye']"/>{{ content.views }}</span>
        </div>
      </h1>
      <blockquote style="padding: 15px;background: #eee;border-radius: 5px;">
        {{ content.description }}
      </blockquote>
      <div v-html="content.article[index].HTML" v-if="content.article"/>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    content: {},
    index: Number // 展示大博文article属性的第几个文章。
  }
}
</script>

<style scoped>
img {
  max-width: 100%;
}
</style>
