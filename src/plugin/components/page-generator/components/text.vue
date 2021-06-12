<template>
  <div class="page-editor-text">
    <Animation :type="$get(value, 'animation.type', '')">
      <div class="preview" :style="style">{{ value.text }}</div>
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
  import _ from 'lodash';
  import { getStyle } from '../utils';
  import Controller from '../controller';
  import Animation from '../animation';

  const defaultValue = {
    text: '文本',
    style: {
      whiteSpace: 'pre-line',
      fontSize: 16,
      textAlign: 'left',
      lineHeight: 16 * 1.5,
      color: '#000'
    }
  }

  @Component({
    components: {
      Controller,
      Animation
    }
  })
  export default class PageEditorText extends Vue {
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
          prop: 'text',
          label: this.$t('bean.pageGenerator.text'),
          renderCell: {
            component: 'uncontrolledTextarea'
          }
        }
      ]
    }

    get styleConfigColumns() {
      return [
        {
          prop: 'fontSize',
          label: this.$t('bean.pageGenerator.fontSize'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'textAlign',
          label: this.$t('bean.pageGenerator.textAlign'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  value: 'left',
                  label: this.$t('bean.pageGenerator.alignLeft'),
                },
                {
                  value: 'right',
                  label: this.$t('bean.pageGenerator.alignRight'),
                },
                {
                  value: 'center',
                  label: this.$t('bean.pageGenerator.alignCenter'),
                },
              ]
            }
          }
        },
        {
          prop: 'lineHeight',
          label: this.$t('bean.pageGenerator.lineHeight'),
          renderCell: {
            component: 'inputNumber'
          }
        },
        {
          prop: 'color',
          label: this.$t('bean.pageGenerator.color'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'backgroundColor',
          label: this.$t('bean.pageGenerator.backgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'fontWeight',
          label: this.$t('bean.pageGenerator.fontWeight'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: this.$t('bean.pageGenerator.fontWeightNormal'),
                  value: 'normal'
                },
                {
                  label: this.$t('bean.pageGenerator.fontWeightBold'),
                  value: 'bold'
                }
              ].concat(
                _.range(100, 1000, 100).map(item => ({
                  label: item,
                  value: item
                }))
              )
            }
          }
        },
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
      ];
    }
  }
</script>
