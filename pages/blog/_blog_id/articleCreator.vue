<template>
  <!-- 向大博文里添加文章-->
  <editor-framework @submit="add_article_to_blog">
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

export default {
  async middleware (ctx) {
    const err_404 = () => ctx.error({
      statusCode: 404,
      message: 'not exist'
    })

    const admin = ctx.store.state.admin
    const blog_id = ctx.route.params.blog_id
    const valid_id = (/^[0-9a-fA-F]{24}$/i).test(blog_id)
    if (['blog-blog_id-metaEditor'].includes(ctx.route.name) && (!admin)) {
      err_404()
    } else if (!valid_id) {
      err_404()
    } else {
      const blog_content = await ctx.$axios.$get('/blog/' + blog_id)
      if (!blog_content || (!blog_content.blog_type)) { // 如果博客不是大博文，不能有这个修改。
        err_404()
      } else if ((!blog_content.visible) && (!admin)) {
        err_404()
      }
    }
  },
  data () {
    return {
      text: '#'
    }
  },
  computed: {
    HTML () {
      return Marked.parse(this.text)
    }
  },
  methods: {
    async add_article_to_blog () {
      const blog_id = this.$route.params.blog_id
      const { index } = await this.$axios.$post('blog/' + blog_id, {
        content: this.text,
        HTML: this.HTML
      })
      await this.$router.push({
        name: 'blog-blog_id',
        params: { blog_id },
        query: { index }
      })
    }
  }

}
</script>

<style scoped>

</style>
