<template>
  <!-- meta editor-->
  <b-form>
    <b-form-group
      id="article_title"
      label-cols-sm="2"
      content-cols-sm="10"
      label="文章标题"
      label-for="title"
    >
      <b-form-input id="title" v-model="meta_data.title"/>
    </b-form-group>
    <b-form-group
      id="article_description"
      label-cols-sm="2"
      content-cols-sm="10"
      label="文章描述"
      label-for="description"
    >
      <b-form-input id="description" v-model="meta_data.description"/>
    </b-form-group>
    <b-form-group
      id="small_picture"
      label-cols-sm="2"
      content-cols-sm="10"
      label="方形小图"
      label-for="small-pic"
    >
      <b-form-input id="small-pic" v-model="meta_data.small_cover"/>
    </b-form-group>
    <b-form-group
      id="big_picture"
      label-cols-sm="2"
      content-cols-sm="10"
      label="文章头图"
      label-for="banner-pic"
    >
      <b-form-input id="banner-pic" v-model="meta_data.big_cover"/>
    </b-form-group>
    <b-form-group
      id="big_picture"
      label-cols-sm="2"
      content-cols-sm="10"
      label="文章标签"
      label-for="tags"
    >
      <b-form-tags id="tags" v-model="meta_data.tags" tag-variant="primary"/>
    </b-form-group>
    <b-form-checkbox id="blog-visible" v-model="meta_data.visible" switch class="d-inline-block"
    >
      博客是否可见
      <font-awesome-icon :icon="['fas', (meta_data.visible ? 'eye' : 'eye-slash')]"/>
    </b-form-checkbox>
    <div class="d-inline-block ml-1">
      <span>博客类型</span>
      <b-form-radio-group
        id="blog-type"
        v-model="meta_data.blog_type"
        :options="[{text:'大博文', value:1},{text:'小博文',value:0}]"
        name="radio-options"
        class="d-inline-block"
        :disabled="lock_blog_type"
      />
    </div>
  </b-form>
</template>

<script>
export default {
  props: {
    lock_blog_type: Boolean,
    meta: {
      title: String,
      description: String,
      small_cover: String,
      big_cover: String,
      visible: Boolean,
      blog_type: Number,
      tags: Array
    }
  },
  data () {
    const meta_data = this.meta
    return { meta_data }
  },
  watch: {
    meta_data: {
      handler (val) {
        this.$emit('update:meta', val)
      },
      deep: true
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
