<template>
  <section>
    <quill-editor
      @change="onEditorChange" :content="value"
      ref="quillEditor" :options="editorOption"
    />
    <input
      ref="imageFile" type="file" style="display: none;"
      @change="e => onChange(e, 'image')" accept="image/*"
    />
    <input
      ref="videoFile" type="file" style="display: none;"
      @change="e => onChange(e, 'video')" accept="video/*"
    />
  </section>
</template>

<script>
  import { Component, Vue, Model, Prop } from 'vue-property-decorator'
  import VueQuillEditor from 'vue-quill-editor'
  import Quill from 'quill'
  import { upload as uploadToQiniu } from '../utils'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  window.Quill = Quill
  require('quill-image-resize-module')

  const VideoView = Quill.imports['formats/video']
  window.VideoView = VideoView
  VideoView.tagName = 'VIDEO'
  VideoView.create = function (value) {
    let node = VideoView.__proto__.create.call(this, value)
    node.setAttribute('src', this.sanitize(value))
    node.setAttribute('controls', '')
    node.setAttribute('class', 'ql-video')
    return node
  }

  const ImageView = Quill.imports['formats/image']
  ImageView.create = function (value) {
    let node = ImageView.__proto__.create.call(this, value)
    if (typeof value === 'string') {
      node.setAttribute('src', this.sanitize(value))
      node.setAttribute('class', 'ql-image')
    }
    return node
  }

  Vue.use(VueQuillEditor, /* { default global options } */)

  @Component
  export default class RichEditor extends Vue {
    @Model('change') value
    @Prop({ type: Array, default: () => ['image', 'video'] }) media

    editorOption = {
      modules: {
        toolbar: {
          container: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }],               // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'],                      // remove formatting button
            ['link', ...this.media]
          ],
          handlers: {
            'image': () => this.$refs.imageFile.click(),
            'video': () => this.$refs.videoFile.click(),
          }
        },
        imageResize: {}
      },
      placeholder: ''
    }

    async onChange(e, type) {
      const addRange = this.quill.getSelection()
      const url = await uploadToQiniu(e.target.files[0])
      this.quill.insertEmbed(this.$get(addRange, 'index', 0), type, url)
    }

    onEditorChange({ html }) {
      this.$emit('change', html)
    }

    get quill() {
      return this.$refs.quillEditor.quill
    }
  }
</script>

<style>
  .ql-container {
    height: 300px;
  }

  .ql-snow .ql-picker {
    line-height: 24px;
  }

  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:";
  }

  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0;
    content: '保存';
    padding-right: 0;
  }

  .ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '10px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '18px';
  }

  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '32px';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '文本';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5';
  }

  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6';
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体';
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
    content: '衬线字体';
  }

  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
    content: '等宽字体';
  }
</style>
