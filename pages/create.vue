<template>
  <editor-framework @submit="create_new_blog">
    <template #editor>
      <editor-meta :meta.sync="meta"/>
      <editor-text :text.sync="text"/>
    </template>
    <template #preview>
      <blogitem-big v-if="meta.blog_type" :title="meta.title" :description="meta.description"
                    create_time="Sat Apr 10 2021 16:47:33 GMT+0800"
                    last_modified_time="Sat Apr 10 2021 16:47:33 GMT+0800" :small_cover="meta.small_cover" :views="10"
                    :article_count="5" :visible="meta.visible"
      />
      <blogitem-small v-if="!meta.blog_type" :title="meta.title" :description="meta.description"
                      create_time="Sat Apr 10 2021 16:47:33 GMT+0800"
                      last_modified_time="Sat Apr 10 2021 16:47:33 GMT+0800" :small_cover="meta.small_cover" :views="10"
                      :visible="meta.visible"
      />
      <div v-html="HTML"/>
    </template>
  </editor-framework>
</template>

<script>
import { Marked } from '@ts-stack/markdown'

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
        tags: []
      },
      text: '#'
    }
  },
  computed: {
    HTML () {
      return Marked.parse(this.text)
    }
  },
  methods: {
    async create_new_blog () {
      const { blog_id } = await this.$axios.$post('newBlog', {
        ...this.meta,
        article: this.text,
        HTML: this.HTML
      })
      await this.$router.push({
        name: 'blog-blog_id',
        params: { blog_id }
      })
    }
  }
}
</script>

<style scoped>
.alinement {
  margin-right: .5em;
}

.biggest {
  width: 75%;
  margin: auto;
}

.icon-plate {
  position: absolute;
  right: 13%;
}

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
  .icon-plate {
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
  }

  .small-blog-item {
    width: unset;
  }

  .big-blog-item {
    width: unset;
  }

  .img-area {
    display: none;
  }
}
</style>
