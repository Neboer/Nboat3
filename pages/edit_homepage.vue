<template>
  <div>
    <b-radio-group v-model="selected_lang" :options="options" button-variant="outline-primary"
                   @input="$refs.editor.text_content=homepages[selected_lang]" buttons
    ></b-radio-group>
    <editor-framework @submit="update_homepage">
      <template #editor>
        <editor-text ref="editor" :text="homepages[selected_lang]" @update:text="update_content"/>
      </template>
      <template #preview>
        <div v-html="homepages[selected_lang]"/>
      </template>
    </editor-framework>
  </div>
</template>

<script>
export default {
  middleware ({
    store,
    error
  }) {
    if (!store.state.admin) {
      error({
        statusCode: 404,
        message: 'This page could not be found'
      })
    }
  },
  async asyncData (ctx) {
    const server_homepage = await ctx.$axios.$get('/homepage?lang=all')
    const homepages = {}
    server_homepage.forEach(val => {
      homepages[val.lang] = val.HTML
    })
    return { homepages }
  },
  data () {
    return {
      selected_lang: 'zh',
      options: [
        {
          text: '中文',
          value: 'zh'
        },
        {
          text: '英语',
          value: 'en'
        },
        {
          text: '日语',
          value: 'ja'
        }
      ],
      current_edit: ''
    }
  },
  methods: {
    update_content (content) {
      this.homepages[this.selected_lang] = content
    },
    async update_homepage () {
      const upload_object = Object.keys(this.homepages).map(val => ({
        lang: val,
        HTML: this.homepages[val]
      }))
      await this.$axios.$post('/homepage', upload_object)
      await this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
