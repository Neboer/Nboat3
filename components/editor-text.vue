<template>
  <div id="full_edit">
    <div class="d-inline-block my-2">
      <b-button variant="secondary" @click="open_upload_window">
        <font-awesome-icon :icon="['fas', 'arrow-up']"/>
        上传md源代码
      </b-button>
      <b-button variant="secondary" @click="download_md_as_file">
        <font-awesome-icon :icon="['fas', 'arrow-down']"/>
        下载md源代码
      </b-button>
      <input v-show="false" ref="fileInput" accept=".md" type="file" @change="read_file_content_to_page"/>
      <b-button variant="info" class="ml-sm-2 mt-1 mt-sm-0" @click="copy_all_content_to_clipboard">
        <font-awesome-icon :icon="['fas', 'copy']"/>
        复制到剪贴板
      </b-button>
      <b-button variant="info" class="mt-1 mt-sm-0" @click="paste_from_clipboard">
        <font-awesome-icon :icon="['fas', 'paste']"/>
        从剪贴板粘贴
      </b-button>
    </div>
    <b-form-textarea v-model="text_content" @input="onInput"/>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'

export default {
  props: {
    text: String
  },
  data () {
    return {
      text_content: this.text
    }
  },
  methods: {
    onInput (x) {
      this.$emit('update:text', x)
    },
    open_upload_window () {
      this.$refs.fileInput.click()
    },
    read_file_content_to_page (ev) {
      const fileReader = new FileReader()
      const vm = this
      fileReader.onload = fev => {
        vm.text_content = fev.target.result
        vm.$emit('update:text', fev.target.result)
      }
      fileReader.readAsText(ev.target.files[0])
    },
    download_md_as_file () {
      const blob = new Blob([this.text_content], { type: 'text/plain;charset=utf-8' })
      saveAs(blob, 'blogContent.md')
    },
    copy_all_content_to_clipboard () {
      this.$copyText(this.text_content)
    },
    async paste_from_clipboard () {
      this.text_content = await navigator.clipboard.readText()
      this.$emit('update:text', this.text_content)
    }
  }
}
</script>

<style scoped>

</style>
