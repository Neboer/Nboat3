<template>
  <div>
    <b-media v-for="(val, index) in messages" :key="index" class="mt-2">
      <template #aside>
        <b-avatar v-if="val.issuer === 'Neboer'" src="../static/arisa.jpg" size="3rem" square></b-avatar>
        <b-avatar v-else text="val.issuer"></b-avatar>
      </template>
      <span :title="$moment(val.time).format('lll')">{{ $moment(val.time).fromNow() }}</span>
      <h5 class="mt-0">{{ val.issuer }}
        <b-badge v-if="val.issuer === admin_name" variant="success">所有者</b-badge>
      </h5>
      <p style="white-space: pre-line">
        {{ val.content }}
      </p>
    </b-media>
    <div v-if="$nuxt.context.store.state.admin" class="my-3">
      <b-row>
        <b-col sm="3">名字（不超过10字符）</b-col>
        <b-col sm="9">
          <b-input v-model="issuer" :disabled="admin_only"/>
        </b-col>
      </b-row>
      <editor-text :text.sync="text" class="mb-2"/>
      <b-button variant="success" @click="add_new_message">提交</b-button>
    </div>

    <b-pagination-nav :link-gen="linkGen" :number-of-pages="total_page" use-router/>
  </div>
</template>

<script>
import bbs_checker from '~/libs/bbs_checker'

export default {
  async asyncData (ctx) {
    const total_page = await bbs_checker(ctx)
    let message_list = []
    if (Number.isInteger(total_page)) {
      message_list = await ctx.$axios.$get(`bbs?page=${ctx.query.page}`)
    }
    return {
      messages: message_list,
      total_page
    }
  },
  watchQuery: ['page'],
  data () {
    const admin_name = CONFIG.admin_name
    const admin_only = CONFIG.admin_message_only
    return {
      admin_name,
      admin_only,
      text: '',
      issuer: admin_only ? admin_name : ''
    }
  },
  methods: {
    linkGen (pageNum) {
      return `/wall?page=${pageNum}`
    },
    async add_new_message () {
      // 检查评论内容是否合法，这是一个不应该这么复杂的检查，但是还是检查了。
      if (this.text.length <= CONFIG.max_length.comment &&
        this.issuer.length <= CONFIG.max_length.username &&
        this.text.length > 0 && this.issuer.length > 0 &&
        !(this.issuer === CONFIG.admin_name && (!this.$nuxt.context.store.state.admin))) {
        await this.$axios.$post('/bbs', {
          content: this.text,
          issuer: this.issuer
        })
        await this.$router.push('/wall?page=1')
        await this.$nuxt.refresh()
      } else {
        this.$bvToast.toast('请求错误')
      }
    }
  }
}
</script>

<style scoped>

</style>
