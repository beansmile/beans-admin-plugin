<template>
  <div class="ckeditor-view">
    <textarea :id="instanceId"></textarea>
  </div>
</template>

<script>
  import { Component, Vue, Model, Prop, Watch } from 'vue-property-decorator'
  import { randomString, upload, autoLoading } from '../../utils'
  import setConfig from './config'
  import 'ckeditor/ckeditor'

  require.context('!file-loader?context=node_modules&name=[path][name].[ext]!ckeditor', true, /\.(js|css|png|html)$/)
  const CKEDITOR = window.CKEDITOR
  setConfig(CKEDITOR.config)

  @Component
  export default class CKEditor extends Vue {
    @Model('change', { type: String, default: '' }) value
    @Prop({ type: String, default: () => 'ck_' + randomString() }) instanceId
    @Prop(Object) config
    @Prop({ type: Function, default: new Function }) onLoad

    created() {
      const { editorConfig } = Vue.prototype.$appConfig.ckeditor
      if (!editorConfig.used) {
        editorConfig(CKEDITOR.config)
        editorConfig.used = true
      }
    }

    mounted() {
      const { contentsCss, fileUploadRequest = this.fileUploadRequest, fileUploadResponse = this.fileUploadResponse } = Vue.prototype.$appConfig.ckeditor
      const config = Object.assign({ customConfig: '' }, this.config)
      document.getElementById(this.instanceId).value = this.value
      this.editor = CKEDITOR.replace(this.instanceId, config)
      contentsCss.forEach(link => this.editor.addContentsCss(link))
      this.editor.on('loaded', e => {
        this.onLoad(e)
        this.editor.on('change', e => {
          this.$emit('change', e.editor.getData())
        })
        this.editor.on('fileUploadRequest', fileUploadRequest)
        this.editor.on('fileUploadResponse', fileUploadResponse)
      })
    }

    @Watch('value')
    watchValue() {
      if (this.editor.getData() !== this.value) this.editor.setData(this.value)
    }

    async fileUploadRequest(evt) {
      const { fakeUploadUrl = location.origin } = Vue.prototype.$appConfig.ckeditor
      // Prevented the default behavior.
      evt.stop()
      const { fileLoader } = evt.data
      const { xhr } = fileLoader
      xhr.$uploadResult = await autoLoading(upload(fileLoader.file))
      xhr.open('get', fakeUploadUrl, true)
      xhr.send()
    }

    async fileUploadResponse(evt) {
      // Prevent the default response handler.
      evt.stop()

      // Get XHR and response.
      const { data } = evt
      const { xhr } = data.fileLoader
      data.url = xhr.$uploadResult
    }
  }
</script>
