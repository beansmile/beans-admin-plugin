<template>
  <div class="html-content" v-html="value.richText" :style="style"></div>
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import _ from 'lodash';
import Controller from '../controller';
import { getStyle } from '../helper';

@Component
export default class PageCreatorRichText extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;

  static defaultValue = {
    richText: '<p>富文本</p>'
  }

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent } = context;
      const configColumns = [
        {
          prop: 'richText',
          label: parent.$t('bean.pageGenerator.richText'),
          renderCell: 'editor'
        }
      ];
      const styleColumns = [
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
