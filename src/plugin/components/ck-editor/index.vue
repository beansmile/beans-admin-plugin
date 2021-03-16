<template>
  <div class="ckeditor-view" style="display:inline-block;">
    <textarea :id="instanceId"></textarea>
  </div>
</template>

<script>
  import { Component, Vue, Model, Prop } from 'vue-property-decorator'
  import { randomString, uploadFile, autoLoading } from '../../utils'
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
      const { editorConfig } = this.$vadminConfig.ckeditor
      if (!editorConfig.used) {
        editorConfig(CKEDITOR.config)
        editorConfig.used = true
      }
    }

    mounted() {
      const { contentsCss, fileUploadRequest = this.fileUploadRequest, fileUploadResponse = this.fileUploadResponse } = this.$vadminConfig.ckeditor
      const config = Object.assign({ customConfig: '' }, this.config)
      this.editor = CKEDITOR.replace(this.instanceId, config)
      contentsCss.forEach(link => this.editor.addContentsCss(link))
      this.editor.on('loaded', e => {
        this.onLoad(e)

        setTimeout(() => {
          this.watcher = this.$watch('value', (val) => {
            if (this.editor.getData() !== val) this.editor.setData(val)
          }, { immediate: true });
        }, 500);

        this.editor.on('change', e => {
          this.$emit('change', e.editor.getData())
        })
        this.editor.on('fileUploadRequest', fileUploadRequest)
        this.editor.on('fileUploadResponse', fileUploadResponse)
      })
    }

    beforeDestroy() {
      this.watcher && this.watcher();
    }

    async fileUploadRequest(evt) {
      const { fakeUploadUrl = location.origin } = this.$vadminConfig.ckeditor
      // Prevented the default behavior.
      evt.stop()
      const { fileLoader } = evt.data
      const { xhr } = fileLoader
      xhr.$uploadResult = await autoLoading(uploadFile(fileLoader.file))
      xhr.open('get', fakeUploadUrl, true)
      xhr.send()
    }

    async fileUploadResponse(evt) {
      // Prevent the default response handler.
      evt.stop()

      // Get XHR and response.
      const { data } = evt
      const { xhr } = data.fileLoader
      // Avoid image url expiration in private bucket, editor should using rails blob url
      if (!xhr.$uploadResult.blob_url) {
        console.warn('Please return blob_url in direct_upload interface.')
      }

      data.url = xhr.$uploadResult.blob_url || xhr.$uploadResult.url
    }
  }
</script>
