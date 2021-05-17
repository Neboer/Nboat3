<template>
  <div>
    <template v-for="(blog_item, index) in article_list">
      <blogitem-big
        v-if="blog_item.blog_type" :key="index" :blog_id="blog_item._id" :title="blog_item.title"
        :description="blog_item.description"
        :create_time="blog_item.create_time" :last_modified_time="blog_item.last_modified_time"
        :small_cover="blog_item.small_cover" :views="blog_item.views" :article_count="blog_item.article.length"
        :visible="blog_item.visible" :first_index="blog_item.article[0].index"
      />
      <blogitem-small
        v-else :key="index" :blog_id="blog_item._id" :title="blog_item.title" :description="blog_item.description"
        :create_time="blog_item.create_time" :last_modified_time="blog_item.last_modified_time"
        :small_cover="blog_item.small_cover" :views="blog_item.views"
        :visible="blog_item.visible"
      />
    </template>
    <b-pagination-nav :link-gen="linkGen" :number-of-pages="total_page" use-router/>
  </div>
</template>

<script>
import list_checker from '~/libs/list_checker'

export default {
  async asyncData (ctx) {
    const total_page = await list_checker(ctx)
    let article_list = []
    if (Number.isInteger(total_page)) {
      article_list = await ctx.$axios.$get(`/article?page=${ctx.query.page}`)
    }
    return {
      total_page,
      article_list
    }
  },
  data () {
    return {}
  },
  fetchDelay: 0,
  head: {
    title: 'NBoat3-文章列表',
    meta: [
      {
        name: '博文列表',
        content: 'Neboer的所有文章'
      }
    ]
  },
  watchQuery: ['page'],
  methods: {
    linkGen (pageNum) {
      return `/list?page=${pageNum}`
    }
  }
}
</script>

<style scoped>

.small-blog-item {
  display: flex;
  border: grey 1px solid;
  border-radius: 2px;
  padding: .5em;
  width: 75%;
  margin: 1rem auto;
  position: relative;
  box-shadow: grey 1px 1px;
}

.intro-area {
  flex: 2;
  overflow: hidden;
  max-height: 180px;
  margin-bottom: 1em;
}

.img-area {
  width: 200px;
  height: 200px;
  overflow: hidden;
  margin-left: auto;
}

.date-view-talk {
  position: absolute;
  bottom: 0;
}

@media (max-width: 512px) {
  .small-blog-item {
    width: unset;
  }

  .img-area {
    display: none;
  }
}
</style>
