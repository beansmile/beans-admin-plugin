<template>
  <div class="admin-page-creator-page">
    <div class="admin-page-creator-page__title" :style="titleStyle" v-if="showHeader">
      <span class="text-overflow">{{ value.title }}</span>
    </div>
    <div class="admin-page-creator-page__content" :style="style">
      <slot />
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import Controller from '../controller';
import { getStyle } from '../helper';
import _ from 'lodash';

@Component
export default class PageCreatorPage extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;
  @Prop(Boolean) showHeader;

  static defaultValue = {
    title: '标题'
  }

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent } = context;
      const configColumns = [
        {
          prop: 'title',
          label: parent.$t('bean.pageGenerator.title'),
          renderCell: 'uncontrolledInput'
        },
        {
          prop: 'share.title',
          label: parent.$t('bean.pageGenerator.shareTitle'),
          renderCell: 'uncontrolledInput'
        },
        {
          prop: 'share.imageUrl',
          label: parent.$t('bean.pageGenerator.shareImage'),
          renderCell: {
            component: 'upload',
            props: {
              trackedBy: 'url'
            }
          }
        },
        {
          prop: 'poster.backgroundImage',
          label: parent.$t('bean.pageGenerator.posterBackgroundImage'),
          renderCell: {
            component: 'upload',
            hint: parent.$t('bean.pageGenerator.imageSize', { size: '300 x 400' }),
            props: {
              trackedBy: 'url',
              cropper: {
                width: 300,
                height: 400
              }
            }
          }
        },
        {
          prop: 'poster.backgroundColor',
          label: parent.$t('bean.pageGenerator.posterBackgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'poster.text',
          label: parent.$t('bean.pageGenerator.posterText'),
          renderCell: {
            component: 'uncontrolledInput'
          }
        },
        {
          prop: 'poster.textColor',
          label: parent.$t('bean.pageGenerator.posterTextColor'),
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
          prop: 'title.backgroundColor',
          label: parent.$t('bean.pageGenerator.titleBackgroundColor'),
          renderCell: {
            component: 'colorPicker'
          }
        },
        {
          prop: 'title.color',
          label: parent.$t('bean.pageGenerator.titleColor'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: parent.$t('bean.pageGenerator.white'),
                  value: '#ffffff'
                },
                {
                  label: parent.$t('bean.pageGenerator.black'),
                  value: '#000000'
                }
              ]
            }
          }
        },
        {
          prop: 'backgroundColor',
          label: parent.$t('bean.pageGenerator.backgroundColor'),
          renderCell: {
            component: 'colorPicker'
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
        />
      );
    }
  }

  get style() {
    return getStyle(_.get(this.value, 'style') || {}, this.pageWidth);
  }

  get titleStyle() {
    return getStyle(_.get(this.value, 'style.title') || {}, this.pageWidth);
  }
}
</script>
