import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

window.Quill = Quill
require('quill-image-resize-module')
Vue.use(VueQuillEditor, /* { default global options } */)

class VideoView extends Quill.import('formats/video') {
  static tagName = 'VIDEO'

  static create(value) {
    const node = VideoView.__proto__.__proto__.create.call(this, value)
    node.setAttribute('src', this.sanitize(value))
    node.setAttribute('controls', '')
    node.setAttribute('class', 'video')
    return node
  }
}

class ImageView extends Quill.import('formats/image') {
  static create(value) {
    const node = super.create(value)
    if (typeof value === 'string') {
      node.setAttribute('class', 'image')
      node.style.maxWidth = '100%'
    }
    return node
  }
}

Quill.register(VideoView, true)
Quill.register(ImageView, true)
