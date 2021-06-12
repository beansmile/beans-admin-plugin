<template>
  <div class="page-editor-title">
    <Animation :type="$get(value, 'animation.type', '')">
      <div class="preview" :style="style">
        <div class="title-component" :class="[`type-${value.type.name}`]">
          <span class="split-before" :style="typeStyle"></span>
          <span class="text">{{ value.text }}</span>
          <span class="split-after" :style="typeStyle"></span>
        </div>
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
  import _ from 'lodash';
  import { getStyle } from '../utils';
  import Controller from '../controller';
  import Animation from '../animation';

  const defaultValue = {
    text: '标题',
    type: {
      name: 1,
      style: { backgroundColor: '#000' }
    },
    style: {
      fontSize: 20,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 15,
      paddingBottom: 15
    }
  }

  @Component({
    components: {
      Controller,
      Animation
    }
  })
  export default class PageEditorTitle extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: [Array, Function], default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      return getStyle(_.get(this, 'value.style') || {});
    }

    get typeStyle() {
      return getStyle(_.get(this, 'value.type.style') || {});
    }

    get baseConfigColumns() {
      return [
        {
          prop: 'text',
          label: this.$t('bean.pageGenerator.text'),
          renderCell: 'uncontrolledInput'
        },
        {
          prop: 'type.name',
          label: this.$t('bean.pageGenerator.titleStyle'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: this.$t('bean.pageGenerator.titleStyle1'),
                  value: 1
                },
                {
                  label: this.$t('bean.pageGenerator.titleStyle2'),
                  value: 2
                },
              ]
            }
          }
        },
        {
          prop: 'type.style.backgroundColor',
          label: this.$t('bean.pageGenerator.titleStyleBackgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
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
      ]
    }

  }
</script>
