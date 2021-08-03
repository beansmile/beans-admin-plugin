<template>
  <div class="page-creator-popup">
    <div class="page-creator-popup__mask" />
    <div class="page-creator-popup__popup">
      <div class="page-creator-popup__popup__content" :style="style">
        <img :src="value.image" :style="{ borderRadius: style.borderRadius }" class="img" />
      </div>
      <div class="page-creator-popup__popup__btn-close">
        <i class="el-icon-circle-close"></i>
      </div>
    </div>
  </div>
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
    name: '弹窗',
    image: 'https://via.placeholder.com/200x200/fff',
    autoOpen: false,
    showTimes: 1,
    closeBtnTriggerEvent: true,
    style: {
      backgroundColor: '#fff',
      height: 200,
      borderRadius: 6
    }
  }

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent } = context;
      const configColumns = [
        {
          prop: 'name',
          label: parent.$t('bean.pageGenerator.popupName'),
          renderCell: 'uncontrolledInput'
        },
        {
          prop: 'autoOpen',
          label: parent.$t('bean.pageGenerator.popupAutoOpen'),
          renderCell: 'switch'
        },
        {
          prop: 'showTimes',
          label: parent.$t('bean.pageGenerator.popupShowTimes'),
          renderCell: {
            component: 'inputNumber',
            hint: parent.$t('bean.pageGenerator.popupShowTimesTip'),
            props: {
              min: 1
            }
          }
        },
        {
          prop: 'closeBtnTriggerEvent',
          label: parent.$t('bean.pageGenerator.popupCloseButtonTriggerEvent'),
          renderCell: {
            component: 'switch',
            hint: parent.$t('bean.pageGenerator.popupCloseButtonTip'),
          }
        },
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
          prop: 'height',
          label: parent.$t('bean.pageGenerator.popupRenderHeight'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'borderRadius',
          label: parent.$t('bean.pageGenerator.popupBorderRadius'),
          renderCell: 'inputNumber'
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
          is-popup
        />
      );
    }
  }

  get style() {
    return getStyle(_.get(this, 'value.style') || {}, this.pageWidth);
  }
}
</script>
