<template>
  <editor-framework v-if="text !== null" @submit="modify_current_content">
    <template #editor>
      <editor-text :text.sync="text"/>
    </template>
    <template #preview>
      <div v-html="HTML"/>
    </template>
  </editor-framework>
</template>

<script>
import { Marked } from '@ts-stack/markdown'
import blog_checker from '~/libs/blog_checker'

export default {
  data () {
    return {
      text: null
    }
  },
  async fetch () {
    const blog_content = await blog_checker(this.$nuxt.context)
    if (this.$nuxt.context.query.index) { // 大博文！
      this.text = blog_content.article.find(article => article.index === parseInt(this.$nuxt.context.query.index)).content
    } else {
      this.text = blog_content.article
    }
  },
  computed: {
    HTML () {
      return Marked.parse(this.text)
    }
  },
  methods: {
    async modify_current_content () {
      if (this.$nuxt.context.query.index) {
        await this.$axios.$put('/blog/' + this.$route.params.blog_id + '?index=' + this.$nuxt.context.query.index, {
          content: this.text,
          HTML: this.HTML
        })
        await this.$router.push({
          name: 'blog-blog_id',
          params: { blog_id: this.$route.params.blog_id },
          query: { index: this.$nuxt.context.query.index }
        })
      } else {
        await this.$axios.$put('/blog/' + this.$route.params.blog_id, {
          content: this.text,
          HTML: this.HTML
        })
        await this.$router.push({
          name: 'blog-blog_id',
          params: { blog_id: this.$route.params.blog_id }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
