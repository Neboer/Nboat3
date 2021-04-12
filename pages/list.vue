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
  </div>
</template>

<script>
export default {
  data () {
    return {
      article_list: []
    }
  },
  async fetch () {
    this.article_list = await this.$axios.$get('/article?page=1')
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
