<template>
  <!-- 输入框架。包含“预览、编辑博文的功能。提供HTML preview功能，同时提供一个插槽，调用者可以自行向插槽中放入编辑器控件。”-->
  <div class="m-2">
    <div class="my-2">
      <b-nav pills class="d-inline-flex">
        <b-nav-item :active="mode === 'preview'" @click="mode = 'preview'">
          <font-awesome-icon :icon="['fas', 'eye']"/>
          预览
        </b-nav-item>
        <b-nav-item :active="mode === 'edit'" @click="mode = 'edit'">
          <font-awesome-icon :icon="['fas', 'pen']"/>
          编辑
        </b-nav-item>
      </b-nav>
      <b-button variant="success" class="float-right" @click="submit">
        <font-awesome-icon :icon="['fas', 'check']"/>
        提交
      </b-button>
    </div>
    <div :class="{'d-none': mode !== 'edit'}">
      <slot name="editor"/>
    </div>
    <div :class="{'d-none': mode !== 'preview'}">
      <slot name="preview"/>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mode: 'edit'
    }
  },
  methods: {
    submit () {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>

</style>
