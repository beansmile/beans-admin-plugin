<template>
  <div class="page-editor-rich-text">
    <Animation :type="$get(value, 'animation.type', '')">
      <div class="preview">
        <div class="html-content" v-html="value.richText" :style="style"></div>
      </div>
    </Animation>
    <Controller
      event
      animation
      :popup-components="popupComponents"
      :visible="showController"
      :value="value"
      :pages="pages"
      :columns="baseConfigColumns"
      :styleColumns="styleConfigColumns"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { getStyle } from '../utils';
  import _ from 'lodash';
  import Controller from '../controller';
  import Animation from '../animation';

  const defaultValue = {
    richText: '<p>富文本</p>'
  }

  @Component({
    components: {
      Controller,
      Animation
    }
  })
  export default class PageEditorRichText extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: Array, default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      return getStyle(_.get(this, 'value.style') || {});
    }

    baseConfigColumns = [
      {
        prop: 'richText',
        label: '富文本',
        renderCell: 'editor'
      }
    ]

    styleConfigColumns = [
      {
        prop: 'paddingTop',
        label: '上间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'paddingBottom',
        label: '下间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'paddingLeft',
        label: '左间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'paddingRight',
        label: '右间距',
        renderCell: 'inputNumber'
      }
    ]

  }
</script>
