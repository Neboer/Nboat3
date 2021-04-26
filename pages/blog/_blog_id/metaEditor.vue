<template>
  <!-- 小博文和大博文的通用meta编辑页面。-->
  <editor-framework @submit="change_blog_meta">
    <template #editor>
      <editor-meta :meta.sync="meta" :lock_blog_type="lock_blog_type"/>
    </template>
    <template #preview>
      <blogitem-big v-if="meta.blog_type" :title="meta.title" :description="meta.description"
                    :create_time="meta.create_time" :last_modified_time="meta.last_modified_time"
                    :small_cover="meta.small_cover" :views="meta.views"
                    :article_count="meta.article_count" :visible="meta.visible"
      />
      <blogitem-small v-if="!meta.blog_type" :title="meta.title" :description="meta.description"
                      :create_time="meta.create_time" :last_modified_time="meta.last_modified_time"
                      :small_cover="meta.small_cover" :views="meta.views" :visible="meta.visible"
      />
    </template>
  </editor-framework>
</template>

<script>
import blog_checker from '~/libs/blog_checker'

export default {
  data () {
    return {
      meta: {
        title: '',
        description: '',
        small_cover: '',
        big_cover: '',
        visible: true,
        blog_type: 0,
        tags: [],

        create_time: 'Sat Apr 10 2021 16:47:33 GMT+0800',
        last_modified_time: 'Sat Apr 10 2021 16:47:33 GMT+0800',
        views: 10,
        article_count: 1
      },
      lock_blog_type: false
    }
  },
  async fetch () {
    const blog_content = await blog_checker(this.$nuxt.context)
    Object.keys(this.meta).forEach(key => {
      this.meta[key] = blog_content[key]
    })
    if (this.meta.blog_type) {
      this.meta.article_count = blog_content.article.length
    }
    this.lock_blog_type = !!(this.meta.blog_type)
  },
  methods: {
    async change_blog_meta () {
      const update_object = {};
      (['title', 'description', 'small_cover', 'big_cover', 'visible', 'blog_type', 'tags']).forEach(key => {
        update_object[key] = this.meta[key]
      })
      await this.$axios.$put('/blog/' + this.$route.params.blog_id, update_object)
      await this.$router.push({
        name: 'blog-blog_id',
        params: { blog_id: this.$route.params.blog_id }
      })
    }
  }
}
</script>

<style scoped>

</style>
