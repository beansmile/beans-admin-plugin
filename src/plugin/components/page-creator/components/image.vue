<template>
  <div :style="containerStyle">
    <img :src="value.image" :style="style" />
  </div>
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import _ from 'lodash';
import Controller from '../controller';
import { getStyle } from '../helper';

@Component
export default class PageCreatorImage extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;

  static defaultValue = {
    image: 'https://via.placeholder.com/200x200/ccc',
    style: {
      image: {
        width: 100,
      },
      container: {
        textAlign: 'left'
      }
    }
  }

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent } = context;
      const configColumns = [
        {
          prop: 'image',
          label: parent.$t('bean.pageGenerator.image'),
          renderCell: {
            component: 'upload',
            props: {
              trackedBy: 'url'
            }
          }
        }
      ];
      const styleColumns = [
        {
          prop: 'image.width',
          label: `${parent.$t('bean.pageGenerator.imageWidth')}(%)`,
          renderCell: {
            component: 'inputNumber',
            hint: parent.$t('bean.pageGenerator.relativeWithContainerWidth'),
            props: {
              max: 100
            }
          }
        },
        {
          prop: 'container.textAlign',
          label: parent.$t('bean.pageGenerator.alignType'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: parent.$t('bean.pageGenerator.alignLeft'),
                  value: 'left'
                },
                {
                  label: parent.$t('bean.pageGenerator.alignCenter'),
                  value: 'center'
                },
                {
                  label: parent.$t('bean.pageGenerator.alignRight'),
                  value: 'right'
                }
              ]
            }
          }
        },
        {
          prop: 'container.paddingTop',
          label: parent.$t('bean.pageGenerator.paddingTop'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'container.paddingBottom',
          label: parent.$t('bean.pageGenerator.paddingBottom'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'container.paddingLeft',
          label: parent.$t('bean.pageGenerator.paddingLeft'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'container.paddingRight',
          label: parent.$t('bean.pageGenerator.paddingRight'),
          renderCell: 'inputNumber'
        }
      ];
      return (
        <Controller
          {...context.data}
          configColumns={configColumns}
          styleColumns={styleColumns}
          event
          animation
          is-image
        />
      );
    }
  }

  get style() {
    return {
      ...getStyle(_.get(this, 'value.style.image') || {}, this.pageWidth),
      width: _.get(this, 'value.style.image.width') + '%'
    };
  }

  get containerStyle() {
    return getStyle(_.get(this, 'value.style.container') || {}, this.pageWidth);
  }
}
</script>
