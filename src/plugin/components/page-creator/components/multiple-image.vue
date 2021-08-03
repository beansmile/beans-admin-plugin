<template>
  <div class="page-creator-multiple-image" :style="style">
    <div class="page-creator-multiple-image__item" v-for="(item, index) in value.items" :key="index" :style="imageStyle">
      <img :src="item.image" />
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import _ from 'lodash';
import Controller from '../controller';
import { getStyle } from '../helper';
import EventForm from '../event';

@Component
export default class PageCreatorMultipleImage extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;

  static defaultValue = {
    items: [
      {
        image: 'https://via.placeholder.com/200x200/ccc',
      },
      {
        image: 'https://via.placeholder.com/200x200/ccc',
      }
    ],
    style: {
      container: {
        alignItems: 'flex-start',
        backgroundColor: '#fff'
      },
      image: {
        marginRight: 10
      }
    }
  }

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent, props: { pages, popupComponents } } = context;
      const configColumns = [
        {
          prop: 'items',
          label: parent.$t('bean.pageGenerator.imageList'),
          renderCell: {
            component: 'nestForm',
            props: {
              columns: [
                {
                  prop: 'image',
                  label: parent.$t('bean.pageGenerator.image'),
                  renderCell: {
                    component: 'upload',
                    props: {
                      trackedBy: 'url'
                    }
                  }
                },
                {
                  prop: 'event',
                  label: '',
                  renderCell: (h, context) => <EventForm is-image pages={pages} popupComponents={popupComponents} {...context} />
                }
              ]
            }
          }
        }
      ];
      const styleColumns = [
        {
          prop: 'image.marginRight',
          label: parent.$t('bean.pageGenerator.imageSpacing'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'container.alignItems',
          label: parent.$t('bean.pageGenerator.verticalAlignment'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: parent.$t('bean.pageGenerator.alignTop'),
                  value: 'flex-start'
                },
                {
                  label: parent.$t('bean.pageGenerator.alignBottom'),
                  value: 'flex-end'
                },
                {
                  label: parent.$t('bean.pageGenerator.alignCenter'),
                  value: 'center'
                }
              ]
            }
          }
        },
        {
          prop: 'container.backgroundColor',
          label: parent.$t('bean.pageGenerator.backgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
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
          animation
        />
      );
    }
  }

  get style() {
    return getStyle(_.get(this, 'value.style.container') || {}, this.pageWidth);
  }

  get imageStyle() {
    return getStyle(_.get(this, 'value.style.image') || {}, this.pageWidth);
  }
}
</script>
