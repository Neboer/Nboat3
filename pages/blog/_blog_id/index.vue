<template>
  <div v-if="content !== null">
    <img v-if="content.big_cover" :src="content.big_cover" alt="dummy" class="d-block m-auto mw-100">
    <toolbar v-if="admin" :blog_id="blog_id" :article_index="article_index" :blog_type="content.blog_type"/>
    <blog-big v-if="content.blog_type" :content="content" :index="article_index"/>
    <blog-small v-else :content="content"/>
    <b-pagination-nav v-if="content.blog_type" :pages="page_obj" use-router/>
  </div>
</template>

<script>
import blog_checker from '~/libs/blog_checker'

export default {
  // 说明一下这个设计：博文内容在context里获取，context里获得文章之后判断1.博文是否不存在 2.指定的页码是否不存在 3.访问大博文时是否没有带上页码
  // 然后整个博文的内容将会绑定在context对象上，随着中间件传递给fetch()函数。
  // 删除博文时，文章的index不会改变，但是页码会改变。访问博文的时候url参数为index，但下方显示为页码。
  data () {
    return {
      blog_id: '',
      admin: false,
      content: null
    }
  },
  fetchDelay: 0,
  async fetch () {
    // this.content = this.$nuxt.context.blog_content
    this.content = await blog_checker(this.$nuxt.context)
    this.blog_id = this.content._id
    this.admin = this.$nuxt.context.store.state.admin
  },
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
