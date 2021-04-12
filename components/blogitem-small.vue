<template>
  <div class="small-blog-item">
    <div class="intro-area">
      <h2>{{ title }}</h2>
      <article>{{ description }}</article>
      <nuxt-link class="stretched-link" :to="blog_link">
        <font-awesome-icon :icon="['fas', 'external-link-square-alt']"/>
        继续阅读
      </nuxt-link>
    </div>
    <div class="img-area">
      <img v-if="small_cover" :src="small_cover" alt="good">
    </div>
    <div class="date-view-talk">
      <small>创建:{{ formatDate(create_time) }}</small>
      <small>修改:{{ formatDate(last_modified_time) }}</small>
      <span><font-awesome-icon :icon="['fas', 'eye']"/>{{ views }}</span>
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
    small_cover: String,

    views: Number,
    visible: Boolean
  },
  computed: {
    blog_link () {
      if (this.blog_id) {
        return {
          name: 'blog-blog_id',
          params: { blog_id: this.blog_id }
        }
      } else {
        return '#'
      }
    }
  },
  methods: {
    formatDate
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
