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
    @Prop({ type: [Array, Function], default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      return getStyle(_.get(this, 'value.style') || {});
    }

    get baseConfigColumns() {
      return [
        {
          prop: 'richText',
          label: this.$t('bean.pageGenerator.richText'),
          renderCell: 'editor'
        }
      ]
    }

    get styleConfigColumns() {
      return [
        {
          prop: 'paddingTop',
          label: this.$t('bean.pageGenerator.paddingTop'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'paddingBottom',
          label: this.$t('bean.pageGenerator.paddingBottom'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'paddingLeft',
          label: this.$t('bean.pageGenerator.paddingLeft'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'paddingRight',
          label: this.$t('bean.pageGenerator.paddingRight'),
          renderCell: 'inputNumber'
        }
      ]
    }

  }
</script>
