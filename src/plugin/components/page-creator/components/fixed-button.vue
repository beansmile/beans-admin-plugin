<template>
  <div class="page-creator-fixed-button">
    <img :src="value.image" :style="style" />
  </div>
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import _ from 'lodash';
import Controller from '../controller';
import { getStyle } from '../helper';

@Component
export default class PageCreatorFixedButton extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;

  static defaultValue = {
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

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent, props: { value } } = context;
      const [positionX, positionY] = (_.get(value, 'position') || '').split('.');
      const configColumns = [
        {
          prop: 'position',
          label: parent.$t('bean.pageGenerator.buttonPosition'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                { label: parent.$t('bean.pageGenerator.rightBottom'), value: 'right.bottom' },
                { label: parent.$t('bean.pageGenerator.rightTop'), value: 'right.top' },
                { label: parent.$t('bean.pageGenerator.leftBottom'), value: 'left.bottom' },
                { label: parent.$t('bean.pageGenerator.leftTop'), value: 'left.top' },
              ]
            }
          }
        },
        positionX && {
          prop: 'x',
          label: parent.$t('bean.pageGenerator.lateralDistance'),
          renderCell: {
            component: 'inputNumber',
            hint: parent.$t('bean.pageGenerator.distanceWithWindow', { position: positionX === 'left' ? parent.$t('bean.pageGenerator.leftSide') : parent.$t('bean.pageGenerator.rightSide') }),
            props: {
              min: 0
            }
          }
        },
        positionY && {
          prop: 'y',
          label: parent.$t('bean.pageGenerator.longitudinalDistance'),
          renderCell: {
            component: 'inputNumber',
            hint: parent.$t('bean.pageGenerator.distanceWithWindow', { position: positionY === 'top' ? parent.$t('bean.pageGenerator.topSide') : parent.$t('bean.pageGenerator.bottomSide') }),
            props: {
              min: 0
            }
          }
        },
        {
          prop: 'image',
          label: parent.$t('bean.pageGenerator.buttomImage'),
          renderCell: {
            component: 'upload',
            props: {
              trackedBy: 'url'
            }
          }
        }
      ].filter(Boolean);
      const styleColumns = [
        {
          prop: 'width',
          label: parent.$t('bean.pageGenerator.buttonWidth'),
          renderCell: {
            component: 'inputNumber',
            props: {
              min: 0
            }
          }
        },
        {
          prop: 'height',
          label: parent.$t('bean.pageGenerator.buttonHeight'),
          renderCell: {
            component: 'inputNumber',
            props: {
              min: 0
            }
          }
        },
        {
          prop: 'zIndex',
          label: parent.$t('bean.pageGenerator.buttonZIndex'),
          renderCell: {
            component: 'inputNumber',
            hint: parent.$t('bean.pageGenerator.buttonZIndexInfo'),
            props: {
              min: 9
            }
          }
        }
      ];
      return (
        <Controller
          {...context.data}
          configColumns={configColumns}
          styleColumns={styleColumns}
          event
        />
      );
    }
  }

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
      ...getStyle(style, this.pageWidth),
      position: 'absolute'
    }
  }
}
</script>
