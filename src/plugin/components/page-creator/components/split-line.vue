<template>
  <div :style="containerStyle">
    <div class="border" :style="style"></div>
  </div>
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import _ from 'lodash';
import Controller from '../controller';
import { getStyle } from '../helper';

@Component
export default class PageCreatorSplitLine extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;

  static defaultValue = {
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

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent } = context;
      const configColumns = [];
      const styleColumns = [
        {
          prop: 'border.borderColor',
          label: parent.$t('bean.pageGenerator.lineColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'border.borderTopWidth',
          label: parent.$t('bean.pageGenerator.lineBorderWidth'),
          renderCell: {
            component: 'inputNumber',
          }
        },
        {
          prop: 'border.borderStyle',
          label: parent.$t('bean.pageGenerator.lineType'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  value: 'solid',
                  label: parent.$t('bean.pageGenerator.solid'),
                },
                {
                  value: 'dashed',
                  label: parent.$t('bean.pageGenerator.dashed'),
                },
                {
                  value: 'dotted',
                  label: parent.$t('bean.pageGenerator.dotted'),
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
        />
      );
    }
  }

  get style() {
    return getStyle(_.get(this, 'value.style.border') || {}, this.pageWidth);
  }

  get containerStyle() {
    return getStyle(_.get(this, 'value.style.container') || {}, this.pageWidth);
  }
}
</script>
