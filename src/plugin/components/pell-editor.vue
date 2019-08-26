<template>
  <div class="editor" ref="editor"></div>
</template>


<script>
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import pell from 'pell';
import { createUploadDialog } from './upload';

@Component
export default class PellEditor extends Vue {

  @Prop(String) html;

  mounted() {
    // https://github.com/jaredreich/pell
    // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand

    // TODO 图标统一一套，部分组件实现
    this.editor = pell.init({
      element: this.$refs.editor,
      onChange: html => this.$emit('change', html),
      defaultParagraphSeparator: 'div',
      styleWithCSS: false,
      actions: [
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'heading1',
        'heading2',
        'paragraph',
        'quote',
        'olist',
        'ulist',
        'code',
        'line',
        'link',
        // {
        //   name: 'fontSize',
        //   icon: '字体大小',
        //   title: '字体大小',
        //   // TODO 选字体大小
        //   result: () => pell.exec('fontSize', 1)
        // },
        // {
        //   name: 'foreColor',
        //   icon: '颜色',
        //   title: '颜色',
        //   // TODO 选颜色
        //   result: () => pell.exec('foreColor', 'red')
        // },
        // {
        //   name: 'hiliteColor',
        //   icon: '背景色',
        //   title: '背景色',
        //   // TODO 选颜色
        //   result: () => pell.exec('hiliteColor', 'green')
        // },
        {
          name: 'image',
          icon: '<i class="el-icon-picture"></i>',
          title: '插入图片',
          result: this.imageAction
        },
        {
          name: 'video',
          icon: '<i class="el-icon-video-camera-solid"></i>',
          title: '插入视频',
          result: this.videoAction
        },
        // {
        //   name: 'justify-center',
        //   icon: '居中',
        //   title: '居中',
        //   result: () => pell.exec('justifyCenter')
        // },
        // {
        //   name: 'justify-full',
        //   icon: '文本对齐',
        //   title: '文本对齐',
        //   result: () => pell.exec('justifyFull')
        // },
        // {
        //   name: 'justify-left',
        //   icon: '左对齐',
        //   title: '左对齐',
        //   result: () => pell.exec('justifyLeft')
        // },
        // {
        //   name: 'justify-right',
        //   icon: '右对齐',
        //   title: '右对齐',
        //   result: () => pell.exec('justifyRight')
        // },
        {
          name: 'undo',
          icon: '<i class="el-icon-refresh-left"></i>',
          title: '撤销',
          result: () => pell.exec('undo')
        },
        {
          name: 'redo',
          icon: '<i class="el-icon-refresh-right"></i>',
          title: '重做',
          result: () => pell.exec('redo')
        }
      ],
      classes: {
        actionbar: 'pell-actionbar',
        button: 'pell-button',
        content: 'pell-content',
        selected: 'pell-button-selected'
      }
    });
    if (this.html) {
      this.editor.content.innerHTML = this.html;
    }
  }

  videoAction() {
    createUploadDialog(this.$createElement, {
      title: '插入视频',
      limit: 1,
      accept: 'video/*',
      size: 100,
      onConfirm: (data) => {
        if (data.length) {
          const video = `
            <video controls>
              <source src="${data[0]}" />
            </video>
          `;
          pell.exec('insertHTML', video);
        }
      }
    });
  }

  imageAction() {
    createUploadDialog(this.$createElement, {
      title: '插入图片',
      limit: 1,
      accept: 'images/*',
      size: 3,
      onConfirm: (data) => {
        if (data.length) {
          pell.exec('insertImage', data[0]);
        }
      }
    });
  }

  @Watch('html')
  onValueChange(val) {
    if (val && this.editor) {
      this.editor.content.innerHTML = val;
    }
  }
}
</script>


<style lang="less">
  @import '~pell/dist/pell.css';
</style>

<style lang="less" scoped>

  .editor {
    border: 1px solid #EBEEF5;
  }

  /deep/ .pell-button {
    width: auto;
    font-size: 16px;
    padding: 2px 10px;
  }
</style>

