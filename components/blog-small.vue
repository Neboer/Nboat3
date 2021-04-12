<template>
  <div>
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
      <div v-if="content.HTML" v-html="content.HTML"/>
    </article>
  </div>
</template>

<script>
export default {
  props: {
    content: {}
  }
}
</script>

<style scoped>

</style>
