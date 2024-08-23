<template>
  <div class="admin-rich-text">
    <el-dialog
      :visible.sync="showDialog"
      fullscreen
      append-to-body
      custom-class="admin-rich-text-dialog"
    >
      <RichText :value="value" :type="type" :contentCss="contentCss" />
    </el-dialog>
    <div class="btn-full-screen" @click="showDialog = true">
      <i class="el-icon-full-screen"></i>
    </div>
    <div class="richText-content">
      <RichText :value="value" :type="type" :contentCss="contentCss" />
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import MarkdownEditor from './markdown-editor.vue';

const RichText = {
  functional: true,
  render(h, context) {
    const { type, value, contentCss = [] } = context.props;
    if (type === 'richText') {
      const attrs = {};
      if (/^http/.test(value)) {
        attrs.src = value;
      } else {
        const styles = contentCss.map(item => `<link rel="stylesheet" type="text/css" href="${item}">`)
        attrs.srcdoc = `${styles}${value}`;
      }
      return (
        <div class="box-iframe">
          <iframe class="iframe" frameborder="0" scrolling="auto" border="0" cellspacing="0" attrs={attrs}></iframe>
        </div>
      )
    }
    if (type === 'markdown') {
      return <MarkdownEditor
        value={value}
        editable={false}
        toolbarsFlag={false}
        subfield={false}
        defaultOpen="preview"
      />
    }
  }
};

@Component({
  components: {
    RichText
  }
})
export default class AdminRichText extends Vue {
  @Prop(String) value;
  @Prop({ type: String, default: 'richText' }) type; // richText, markdown
  @Prop(Array) contentCss;
  showDialog = false;
}
</script>
