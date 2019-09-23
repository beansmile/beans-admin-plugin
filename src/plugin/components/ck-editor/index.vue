<template>
  <div class="ckeditor-view">
    <textarea :id="instanceId"></textarea>
  </div>
</template>

<script>
  import { Component, Vue, Model, Prop, Watch } from 'vue-property-decorator'
  import { randomString } from '../../utils'
  import setConfig from './config'
  import 'ckeditor/ckeditor'
  import './upload-patch'

  require.context('!file-loader?context=node_modules&name=[path][name].[ext]!ckeditor', true, /\.(js|css|png|html)$/)
  const CKEDITOR = window.CKEDITOR
  setConfig(CKEDITOR.config)

  @Component
  export default class CKEditor extends Vue {
    @Model('change') value
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
      const config = Object.assign({ customConfig: '' }, this.config)
      this.editor = CKEDITOR.replace(this.instanceId, config)
      this.editor.on('loaded', e => {
        this.onLoad(e)
        this.editor.setData(this.value)
        this.editor.on('change', e => {
          this.$emit('change', e.editor.getData())
        })
      })
    }

    @Watch('value')
    watchValue() {
      if (this.editor.getData() !== this.value) this.editor.setData(this.value)
    }
  }
</script>

<style lang="less">
  body .cke_screen_reader_only {
    position: fixed;
  }
</style>
