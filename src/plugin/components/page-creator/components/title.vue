<template>
  <div :style="style">
    <div class="title-component" :class="[`type-${value.type.name}`]">
      <span class="split-before" :style="typeStyle"></span>
      <span class="text">{{ value.text }}</span>
      <span class="split-after" :style="typeStyle"></span>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import _ from 'lodash';
import Controller from '../controller';
import { getStyle } from '../helper';

@Component
export default class PageCreatorTitle extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;

  static defaultValue = {
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

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent } = context;
      const configColumns = [
        {
          prop: 'text',
          label: parent.$t('bean.pageGenerator.text'),
          renderCell: 'uncontrolledInput'
        },
        {
          prop: 'type.name',
          label: parent.$t('bean.pageGenerator.titleStyle'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: parent.$t('bean.pageGenerator.titleStyle1'),
                  value: 1
                },
                {
                  label: parent.$t('bean.pageGenerator.titleStyle2'),
                  value: 2
                },
              ]
            }
          }
        },
        {
          prop: 'type.style.backgroundColor',
          label: parent.$t('bean.pageGenerator.titleStyleBackgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
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

  get typeStyle() {
    return getStyle(_.get(this, 'value.type.style') || {}, this.pageWidth);
  }
}
</script>
