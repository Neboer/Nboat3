<template>
  <!-- Nboat3的核心编辑功能：编辑meta、编辑文章内容（大小博文）、设为隐藏、设为可见、删除整个博客、添加新文章（大博文）、删除当前文章（大博文）。-->
  <div>
    <b-button-group class="ml-3">
      <template v-for="(tool, index) in tools">
        <b-button v-if="tool.href" :key="index" :variant="tool.variant" :title="tool.tooltip" :to="tool.href">
          <font-awesome-icon :icon="tool.icon"/>
        </b-button>
        <b-button v-if="tool.click" :key="index" :variant="tool.variant" :title="tool.tooltip" @click="tool.click">
          <font-awesome-icon :icon="tool.icon"/>
        </b-button>
      </template>
    </b-button-group>
  </div>
</template>

<script>
export default {
  props: {
    blog_id: String,
    article_index: Number,
    blog_type: Number,
    blog_count: Number
  },
  computed: {
    tools () {
      const vm = this
      const result = [{
        variant: 'primary',
        icon: ['fas', 'info'],
        tooltip: '修改博客meta',
        href: {
          name: 'blog-blog_id-metaEditor',
          params: { blog_id: this.blog_id }
        }
      }, {
        variant: 'primary',
        icon: ['fas', 'align-justify'],
        tooltip: '修改这篇文章',
        href: this.blog_type
          ? {
            name: 'blog-blog_id-articleEditor',
            params: { blog_id: this.blog_id },
            query: { index: this.article_index }
          }
          : {
            name: 'blog-blog_id-articleEditor',
            params: { blog_id: this.blog_id }
          }
      }, {
        variant: 'danger',
        icon: ['fas', 'trash'],
        tooltip: '删除整个博客',
        async click () {
          const res = await vm.$axios.$delete(`/blog/${vm.blog_id}`)
          await vm.$router.push({
            name: 'list',
            query: { page: 1 }
          })
        }
      }]

      if (this.blog_type) { // 如果是大博文的话…
        const big_blog_editor = [{
          variant: 'primary',
          icon: ['fas', 'plus'],
          tooltip: '添加一篇文章',
          href: {
            name: 'blog-blog_id-articleCreator', // 在大博文中添加小文章的按钮
            params: { blog_id: this.blog_id }
          }
        }]
        if (this.blog_count > 1) {
          big_blog_editor.push({
            variant: 'danger',
            icon: ['fas', 'minus'],
            tooltip: '删除一篇文章',
            async click () {
              const res = await vm.$axios.$delete(`/blog/${vm.blog_id}?index=${vm.article_index}`)
              await vm.$nuxt.context.redirect({
                name: 'blog-blog_id',
                params: { blog_id: vm.blog_id }
              })
              vm.$forceUpdate()
            }
          })
        }
        result.splice(2, 0, ...big_blog_editor)
      }
      return result
    }
  },
  methods: {}
}
</script>

<style scoped>
.toolbar-toolbtn {
  width: 3em;
  font-size: 20px;
}
</style>
