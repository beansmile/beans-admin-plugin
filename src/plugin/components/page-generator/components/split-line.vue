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
    @Prop({ type: Array, default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      return getStyle(_.get(this, 'value.style.border') || {});
    }

    get containerStyle() {
      return getStyle(_.get(this, 'value.style.container') || {});
    }

    styleConfigColumns = [
      {
        prop: 'border.borderColor',
        label: '线条颜色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      },
      {
        prop: 'border.borderTopWidth',
        label: '线条粗细',
        renderCell: {
          component: 'inputNumber',
        }
      },
      {
        prop: 'border.borderStyle',
        label: '线条类型',
        renderCell: {
          component: 'select',
          props: {
            options: [
              {
                value: 'solid',
                label: '实线'
              },
              {
                value: 'dashed',
                label: '虚线'
              },
              {
                value: 'dotted',
                label: '点'
              }
            ]
          }
        }
      },
      {
        prop: 'container.paddingTop',
        label: '上间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'container.paddingBottom',
        label: '下间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'container.paddingLeft',
        label: '左间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'container.paddingRight',
        label: '右间距',
        renderCell: 'inputNumber'
      }
    ]
  }
</script>

<style lang="scss" scoped>
  .border {
    border-width: 0;
  }
</style>
