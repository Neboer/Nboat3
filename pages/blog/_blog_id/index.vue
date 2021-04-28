<template>
  <div v-if="content !== null">
    <img v-if="content.big_cover" :src="content.big_cover" alt="dummy" class="d-block m-auto mw-100">
    <toolbar v-if="$nuxt.context.store.state.admin" :blog_id="content._id" :article_index="article_index"
             :blog_type="content.blog_type"
    />
    <blog-big v-if="content.blog_type" :content="content" :index="article_index"/>
    <blog-small v-else :content="content"/>
    <b-pagination-nav v-if="content.blog_type" :pages="page_obj" use-router/>
  </div>
</template>

<script>
import blog_checker from '~/libs/blog_checker'

export default {
  // async fetch () {
  //   // this.content = this.$nuxt.context.blog_content
  //   this.content = await blog_checker(this.$nuxt.context)
  //   this.blog_id = this.content._id
  // },
  async asyncData (ctx) {
    const content = await blog_checker(ctx)
    return { content }
  },
  data () {
    return {}
  },
  fetchDelay: 0,
  computed: {
    page_obj () {
      if (this.content) {
        return this.content.article.map((art, ori_index) => {
          return {
            link: {
              query: { index: art.index }
            },
            text: `第${ori_index + 1}页`
          }
        })
      } else {
        return [{
          link: { query: { page: 1 } },
          text: 'Page 1'
        }]
      }
    },
    article_index () {
      return parseInt(this.$route.query.index)
    }
  },
  methods: {
    linkGen (page) {
      return `/list?page=${page}`
    }
  }
}
</script>

<style scoped>

</style>
