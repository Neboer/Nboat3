<template>
  <div class="big-blog-item">
    <div class="big-img-area">
      <img :src="big_cover" alt="good" class="big-image">
    </div>
    <div class="big-intro-area">
      <h2>{{ title }}</h2>
      <article>
        {{ description }}
      </article>
      <nuxt-link class="stretched-link" :to="{name: 'blog-blog_id', params: {blog_id}}">
        <font-awesome-icon :icon="['fas', 'external-link-square-alt']"/>
        继续阅读
      </nuxt-link>
    </div>
    <div class="date-view-talk">
      <small>创建:{{ formatDate(create_time) }}</small>
      <small>修改:{{ formatDate(last_modified_time) }}</small>
      <span><font-awesome-icon :icon="['fas', 'eye']" /> {{ views }}</span>
      <span><font-awesome-icon :icon="['fas', 'file']" /> {{ articles_count }}</span>
    </div>
  </div>
</template>

<script>
import formatDate from '../libs/date_tools'

export default {
  props: {
    blog_id: String,

    title: String,
    description: String,
    create_time: String,
    last_modified_time: String,
    big_cover: String,

    views: Number,
    articles_count: Number,
    visible: Boolean
  },
  methods: {
    formatDate
  }
}
</script>

<style scoped>
.date-view-talk {
  position: absolute;
  bottom: 0;
}

.big-blog-item {
  border: grey 1px solid;
  border-radius: 2px;
  padding: .5em;
  width: 75%;
  margin: 1rem auto;
  position: relative;
  box-shadow: grey 1px 1px;
}

.big-img-area {
  max-height: 200px;
  overflow: hidden;
}

.big-image {
  width: 100%;
}

.big-intro-area {
  margin-bottom: 1em;
  min-height: 150px;
}

@media (max-width: 512px) {
  .big-blog-item {
    width: unset;
  }
}
</style>
