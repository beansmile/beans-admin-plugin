<template>
  <mavon-editor
    class="admin-mavon-editor"
    :value="value"
    v-bind="options"
    v-on="$listeners"
    @change="handleChange"
    ref="editor"
  >
    <template #left-toolbar-after>
      <FormUploader
        trackedBy="url"
        style="position: fixed;
        left: -200%;"
        ref="formUploader"
        @change="handleImageChange"
      />
      <button
        type="button"
        class="op-icon fa fa-mavon-picture-o"
        aria-hidden="true"
        :title="$t('bean.pageGenerator.image')"
        @click="handleUploadImgClick"
      ></button>
      <button
        type="button"
        class="op-icon icon-br"
        @click="handleInsertBr"
      >
      </button>
    </template>
  </mavon-editor>
</template>

<script>
import { Vue, Component, Model, Emit } from 'vue-property-decorator';
import FormUploader from './form/upload';
import _ from 'lodash';

@Component({
  components: {
    FormUploader
  }
})
export default class MarkdownEditor extends Vue {
  @Model('change', String) value;

  get options() {
    return {
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        // superscript: true, // 上角标
        // subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        code: true, // code
        // table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        // save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        // navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
      ...(_.get(Vue, 'vadminConfig.markdownEditor') || {}),
      ...this.$attrs
    }
  }

  mounted() {
    const markdownIt = this.$refs.editor.markdownIt;
    markdownIt.use(
      require('markdown-it-implicit-figures'),
      {
        figcaption: true,
        link: false
      }
    );
  }

  @Emit('change')
  handleChange(data) {
    return data;
  }

  handleUploadImgClick() {
    this.$refs.formUploader.triggerUpload();
  }

  handleImageChange(src) {
    const $editor = this.$refs.editor;
    $editor.insertText(
      $editor.getTextareaDom(),
      { prefix: '![](', subfix: ')', str: src
    });
  }

  handleInsertBr() {
    const $editor = this.$refs.editor;
    const dom = $editor.getTextareaDom();
    $editor.insertText(
      dom,
      { prefix: '', str: '\n<br>\n', subfix: '' },
    );
    dom.selectionStart = dom.selectionEnd;
  }
}
</script>
