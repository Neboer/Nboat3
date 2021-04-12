<template>
  <!-- Nboat3的核心编辑功能：编辑meta、编辑文章内容（大小博文）、设为隐藏、设为可见、删除整个博客、添加新文章（大博文）、删除当前文章（大博文）。-->
  <div>
    <b-button-group class="ml-3">
      <b-button v-for="(tool, index) in tools" :key="index" :variant="tool.variant" :title="tool.tooltip"
                class="toolbar-toolbtn" :to="tool.href"
      >
        <font-awesome-icon :icon="tool.icon"/>
      </b-button>
    </b-button-group>
  </div>
</template>

<script>
export default {
  props: {
    blog_id: String,
    article_index: Number,
    blog_type: Number
  },
  // data () {
  //   return {
  //     tools:
  //   }
  // },
  computed: {
    tools () {
      return [{
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
        href: this.article_index ? {
            name: 'blog-blog_id-articleEditor',
            params: { blog_id: this.blog_id }
          } : {
            name: 'blog-blog_id-articleEditor',
            params: { blog_id: this.blog_id },
            query: { index: this.index }
          }
      }, {
        variant: 'danger',
        icon: ['fas', 'trash'],
        tooltip: '删除整个文章',
        href: '#'
      }]
    }
  }
}
</script>

<style scoped>
.toolbar-toolbtn {
  width: 3em;
  font-size: 20px;
}
</style>
