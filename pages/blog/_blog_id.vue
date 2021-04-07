<template>
  <div>
    <toolbar/>
    <blog-big v-if="content.type" :content="content" :index="page - 1"/>
    <blog-small v-else :content="content" />
    <b-pagination v-if="content.article && content.type" v-model="page"
      :total-rows="2" :per-page="1" class="mt-3"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: {},
      page: 1
    }
  },

  async fetch () {
    this.content = await this.$axios.$get('/blog/' + this.$route.params.blog_id)
    if (this.$route.query.page) {
      this.page = this.$route.query.page
    }
  }
}
</script>

<style scoped>

</style>
