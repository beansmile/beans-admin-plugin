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
          label: this.$t('bean.pageGenerator.buttonPosition'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                { label: this.$t('bean.pageGenerator.rightBottom'), value: 'right.bottom' },
                { label: this.$t('bean.pageGenerator.rightTop'), value: 'right.top' },
                { label: this.$t('bean.pageGenerator.leftBottom'), value: 'left.bottom' },
                { label: this.$t('bean.pageGenerator.leftTop'), value: 'left.top' },
              ]
            }
          }
        },
        positionX && {
          prop: 'x',
          label: this.$t('bean.pageGenerator.lateralDistance'),
          renderCell: {
            component: 'inputNumber',
            hint: this.$t('bean.pageGenerator.distanceWithWindow', { position: positionX === 'left' ? this.$t('bean.pageGenerator.leftSide') : this.$t('bean.pageGenerator.rightSide') }),
            props: {
              min: 0
            }
          }
        },
        positionY && {
          prop: 'y',
          label: this.$t('bean.pageGenerator.longitudinalDistance'),
          renderCell: {
            component: 'inputNumber',
            hint: this.$t('bean.pageGenerator.distanceWithWindow', { position: positionY === 'top' ? this.$t('bean.pageGenerator.topSide') : this.$t('bean.pageGenerator.bottomSide') }),
            props: {
              min: 0
            }
          }
        },
        {
          prop: 'image',
          label: this.$t('bean.pageGenerator.buttomImage'),
          renderCell: {
            component: 'upload',
            props: {
              trackedBy: 'url'
            }
          }
        }
      ].filter(Boolean);
    }

    get styleConfigColumns() {
      return [
        {
          prop: 'width',
          label: this.$t('bean.pageGenerator.buttonWidth'),
          renderCell: {
            component: 'inputNumber',
            props: {
              min: 0
            }
          }
        },
        {
          prop: 'height',
          label: this.$t('bean.pageGenerator.buttonHeight'),
          renderCell: {
            component: 'inputNumber',
            props: {
              min: 0
            }
          }
        },
        {
          prop: 'zIndex',
          label: this.$t('bean.pageGenerator.buttonZIndex'),
          renderCell: {
            component: 'inputNumber',
            hint: this.$t('bean.pageGenerator.buttonZIndexInfo'),
            props: {
              min: 9
            }
          }
        }
      ]
    }

  }
</script>
