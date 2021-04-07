<template>
  <!-- Nboat3的核心编辑功能：编辑meta、编辑文章内容（大小博文）、设为隐藏、设为可见、删除整个博客、添加新文章（大博文）、删除当前文章（大博文）。-->
  <div>
    <b-button-group>
      <b-button v-for="tool in tools" :variant="tool.variant" :title="tool.tooltip" class="toolbar-toolbtn">
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
  data () {
    return {
      tools: [{
        variant: 'primary',
        icon: ['fas', 'info'],
        tooltip: '修改博客meta'
      }, {
        variant: 'primary',
        icon: ['fas', 'align-justify'],
        tooltip: '修改这篇文章'
      }, {
        variant: 'danger',
        icon: ['fas', 'trash'],
        tooltip: '删除整个文章'
      }]
    }
  }
}
</script>

<style scoped>

</style>
