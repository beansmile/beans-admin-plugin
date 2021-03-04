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
    @Prop({ type: Array, default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      return getStyle(_.get(this, 'value.style') || {});
    }

    baseConfigColumns = [
      {
        prop: 'text',
        label: '文本',
        renderCell: {
          component: 'uncontrolledTextarea'
        }
      }
    ]

    styleConfigColumns = [
      {
        prop: 'fontSize',
        label: '字体大小',
        renderCell: 'inputNumber'
      },
      {
        prop: 'textAlign',
        label: '对齐',
        renderCell: {
          component: 'select',
          props: {
            options: [
              {
                value: 'left',
                label: '左对齐'
              },
              {
                value: 'right',
                label: '右对齐'
              },
              {
                value: 'center',
                label: '居中'
              },
            ]
          }
        }
      },
      {
        prop: 'lineHeight',
        label: '行高',
        renderCell: {
          component: 'inputNumber'
        }
      },
      {
        prop: 'color',
        label: '颜色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      },
      {
        prop: 'backgroundColor',
        label: '背景颜色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      },
      {
        prop: 'fontWeight',
        label: '字重',
        renderCell: {
          component: 'select',
          props: {
            options: [
              {
                label: '默认',
                value: 'normal'
              },
              {
                label: '加粗',
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
    ];
  }
</script>

<style lang="scss" scoped>
</style>
