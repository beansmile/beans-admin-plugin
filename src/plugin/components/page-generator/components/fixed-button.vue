<template>
  <div class="page-editor-fixed-button" :class="{ showController }">
    <div class="preview">
      <img :src="value.image" :style="style" />
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
    image: 'https://via.placeholder.com/40x40/ccc',
    position: 'right.bottom',
    x: 0,
    y: 80,
    style: {
      position: 'fixed',
      width: 40,
      height: 40,
      zIndex: 9
    }
  }

  @Component({
    components: {
      Controller
    }
  })
  export default class PageEditorFixedButton extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: [Array, Function], default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      const { style = {}, position = '', x = 0, y = 0 } = _.get(this, 'value') || {};
      const [positionX, positionY] = position.split('.');
      const commonStyle = { position: 'fixed' };
      if (positionX) {
        commonStyle[positionX === 'left' ? 'left' : 'right'] = x + 'px';
      }
      if (positionY) {
        commonStyle[positionY === 'top' ? 'top' : 'bottom'] = y + 'px';
      }
      return {
        ...commonStyle,
        ...getStyle(style),
        position: 'absolute'
      }
    }

    get baseConfigColumns() {
      const [positionX, positionY] = (_.get(this.value, 'position') || '').split('.');
      return [
        {
          prop: 'position',
          label: '按钮位置',
          renderCell: {
            component: 'select',
            props: {
              options: [
                { label: '右下', value: 'right.bottom' },
                { label: '右上', value: 'right.top' },
                { label: '左下', value: 'left.bottom' },
                { label: '左上', value: 'left.top' },
              ]
            }
          }
        },
        positionX && {
          prop: 'x',
          label: '横向距离',
          renderCell: {
            component: 'inputNumber',
            hint: `距离可视窗口${positionX === 'left' ? '左边' : '右边'}距离`,
            props: {
              min: 0
            }
          }
        },
        positionY && {
          prop: 'y',
          label: '纵向距离',
          renderCell: {
            component: 'inputNumber',
            hint: `距离可视窗口${positionY === 'top' ? '顶部' : '底部'}距离`,
            props: {
              min: 0
            }
          }
        },
        {
          prop: 'image',
          label: '按钮图片',
          renderCell: {
            component: 'upload',
            props: {
              trackedBy: 'url'
            }
          }
        }
      ].filter(Boolean);
    }

    styleConfigColumns = [
      {
        prop: 'width',
        label: '按钮宽度',
        renderCell: {
          component: 'inputNumber',
          props: {
            min: 0
          }
        }
      },
      {
        prop: 'height',
        label: '按钮高度',
        renderCell: {
          component: 'inputNumber',
          props: {
            min: 0
          }
        }
      },
      {
        prop: 'zIndex',
        label: '按钮层级',
        renderCell: {
          component: 'inputNumber',
          hint: '多个固定按钮，层级高的会显示在上面',
          props: {
            min: 9
          }
        }
      }
    ]

  }
</script>
