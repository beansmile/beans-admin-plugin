<template>
  <div :style="style">{{ value.text }}</div>
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import _ from 'lodash';
import Controller from '../controller';
import { getStyle } from '../helper';

@Component
export default class PageCreatorText extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;

  static defaultValue = {
    text: '文本',
    style: {
      whiteSpace: 'pre-line',
      fontSize: 16,
      textAlign: 'left',
      lineHeight: 16 * 1.5,
      color: '#000'
    }
  }

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent } = context;
      const configColumns = [
        {
          prop: 'text',
          label: parent.$t('bean.pageGenerator.text'),
          renderCell: {
            component: 'uncontrolledTextarea'
          }
        }
      ];
      const styleColumns = [
        {
          prop: 'fontSize',
          label: parent.$t('bean.pageGenerator.fontSize'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'textAlign',
          label: parent.$t('bean.pageGenerator.textAlign'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  value: 'left',
                  label: parent.$t('bean.pageGenerator.alignLeft'),
                },
                {
                  value: 'right',
                  label: parent.$t('bean.pageGenerator.alignRight'),
                },
                {
                  value: 'center',
                  label: parent.$t('bean.pageGenerator.alignCenter'),
                },
              ]
            }
          }
        },
        {
          prop: 'lineHeight',
          label: parent.$t('bean.pageGenerator.lineHeight'),
          renderCell: {
            component: 'inputNumber'
          }
        },
        {
          prop: 'color',
          label: parent.$t('bean.pageGenerator.color'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'backgroundColor',
          label: parent.$t('bean.pageGenerator.backgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'fontWeight',
          label: parent.$t('bean.pageGenerator.fontWeight'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: parent.$t('bean.pageGenerator.fontWeightNormal'),
                  value: 'normal'
                },
                {
                  label: parent.$t('bean.pageGenerator.fontWeightBold'),
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
          label: parent.$t('bean.pageGenerator.paddingTop'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'paddingBottom',
          label: parent.$t('bean.pageGenerator.paddingBottom'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'paddingLeft',
          label: parent.$t('bean.pageGenerator.paddingLeft'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'paddingRight',
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
    return getStyle(_.get(this, 'value.style') || {}, this.pageWidth);
  }
}
</script>
