<template>
  <div :style="style"></div>
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import _ from 'lodash';
import Controller from '../controller';
import { getStyle } from '../helper';

@Component
export default class PageCreatorBlank extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;

  static defaultValue = {
    style: {
      height: 20,
      backgroundColor: '#fff'
    }
  }

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent } = context;
      const configColumns = [];
      const styleColumns = [
        {
          prop: 'height',
          label: parent.$t('bean.pageGenerator.height'),
          renderCell: {
            component: 'inputNumber'
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
