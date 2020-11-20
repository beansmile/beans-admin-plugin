<template>
  <div class="page-editor-title">
    <div class="preview" :style="style">
      <div class="title" :class="[`type-${value.type.name}`]">
        <span class="split-before" :style="typeStyle"></span>
        <span class="text">{{ value.text }}</span>
        <span class="split-after" :style="typeStyle"></span>
      </div>
    </div>

    <Controller
      event
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
      Controller
    }
  })
  export default class PageEditorTitle extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: Array, default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      return getStyle(_.get(this, 'value.style') || {});
    }

    get typeStyle() {
      return getStyle(_.get(this, 'value.type.style') || {});
    }

    baseConfigColumns = [
      {
        prop: 'text',
        label: '文本',
        renderCell: 'uncontrolledInput'
      },
      {
        prop: 'type.name',
        label: '风格',
        // TODO 这里的样式要和小程序的对的上
        renderCell: {
          component: 'select',
          props: {
            options: [
              {
                label: '风格一',
                value: 1
              },
              {
                label: '风格二',
                value: 2
              },
            ]
          }
        }
      },
      {
        prop: 'type.style.backgroundColor',
        label: '样式颜色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
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
    ]

  }
</script>

<style lang="scss" scoped>
  .title {

    .text {
      @include text-overflow;
    }

    &.type-1 {
      position: relative;
      padding-left: 8px;

      .split-before {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 4px;
        height: 80%;
      }
    }

    &.type-2 {
      display: flex;
      align-items: center;

      .split-before,
      .split-after {
        flex: 1;
        background: red;
        height: 1px;
      }

      .text {
        margin: 0 10px;
        max-width: 140px;
      }
    }
  }
</style>