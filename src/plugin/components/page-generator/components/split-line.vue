<template>
  <div class="page-editor-split-line">
    <Animation :type="$get(value, 'animation.type', '')">
      <div class="preview" :style="containerStyle">
        <div class="border" :style="style"></div>
      </div>
    </Animation>

    <Controller
      event
      animation
      :popup-components="popupComponents"
      :visible="showController"
      :value="value"
      :pages="pages"
      :styleColumns="styleConfigColumns"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';
  import { getStyle } from '../utils';
  import Controller from '../controller';
  import Animation from '../animation';

  const defaultValue = {
    style: {
      container: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20
      },
      border: {
        borderTopWidth: 1,
        borderStyle: 'solid',
        borderColor: '#eee'
      }
    }
  }

  @Component({
    components: {
     Controller,
     Animation
    }
  })
  export default class PageEditorSplitLine extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: [Array, Function], default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      return getStyle(_.get(this, 'value.style.border') || {});
    }

    get containerStyle() {
      return getStyle(_.get(this, 'value.style.container') || {});
    }

    get styleConfigColumns() {
      return [
        {
          prop: 'border.borderColor',
          label: this.$t('bean.pageGenerator.lineColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'border.borderTopWidth',
          label: this.$t('bean.pageGenerator.lineBorderWidth'),
          renderCell: {
            component: 'inputNumber',
          }
        },
        {
          prop: 'border.borderStyle',
          label: this.$t('bean.pageGenerator.lineType'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  value: 'solid',
                  label: this.$t('bean.pageGenerator.solid'),
                },
                {
                  value: 'dashed',
                  label: this.$t('bean.pageGenerator.dashed'),
                },
                {
                  value: 'dotted',
                  label: this.$t('bean.pageGenerator.dotted'),
                }
              ]
            }
          }
        },
        {
          prop: 'container.paddingTop',
          label: this.$t('bean.pageGenerator.paddingTop'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'container.paddingBottom',
          label: this.$t('bean.pageGenerator.paddingBottom'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'container.paddingLeft',
          label: this.$t('bean.pageGenerator.paddingLeft'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'container.paddingRight',
          label: this.$t('bean.pageGenerator.paddingRight'),
          renderCell: 'inputNumber'
        }
      ]
    }
  }
</script>
