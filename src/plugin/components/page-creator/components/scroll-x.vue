<template>
  <div class="page-creator-scroll-x" :style="getStyle('container')">
    <div class="page-creator-scroll-x__item" v-for="(item, index) in value.items" :key="index" :style="itemStyle">
      <img :src="item.image" :style="getStyle('image')" />
      <div v-if="item.title.show" :style="getStyle('title')">{{ item.title.text }}</div>
      <div v-if="item.subtitle.show" :style="getStyle('subtitle')">{{ item.subtitle.text }}</div>
      <div v-if="item.desc.show" :style="getStyle('desc')">{{ item.desc.text }}</div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import _ from 'lodash';
import Controller from '../controller';
import EventForm from '../event';
import { getStyle } from '../helper';

@Component
export default class PageCreatorScrollX extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;

  static defaultValue = {
    style: {
      container: {
        backgroundColor: '#fff',
        textAlign: 'left'
      },
      image: {
        width: 200,
        height: 200
      },
      title: {
        fontSize: 20,
        lineHeight: 24,
        color: '#000'
      },
      subtitle: {
        fontSize: 16,
        lineHeight: 20,
        color: '#000'
      },
      desc: {
        fontSize: 14,
        lineHeight: 18,
        color: '#000'
      }
    },
    items: [
      {
        image: 'https://via.placeholder.com/200x200/ccc',
        title: {
          show: true,
          text: '标题'
        },
        subtitle: {
          show: true,
          text: '副标题'
        },
        desc: {
          show: true,
          text: '介绍'
        }
      },
      {
        image: 'https://via.placeholder.com/200x200/ccc',
        title: {
          show: true,
          text: '标题'
        },
        subtitle: {
          show: true,
          text: '副标题'
        },
        desc: {
          show: true,
          text: '介绍'
        }
      }
    ]
  }

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent, props: { pages, popupComponents, useEvents } } = context;
      const configColumns = [
        {
          prop: 'items',
          label: '添加图片',
          renderCell: {
            component: 'nestForm',
            props: {
              defaultValue: {
                title: {
                  show: true,
                  text: '标题'
                },
                subtitle: {
                  show: true,
                  text: '副标题'
                },
                desc: {
                  show: true,
                  text: '介绍'
                },
              },
              columns: [
                {
                  prop: 'image',
                  label: '图片',
                  renderCell: {
                    component: 'upload',
                    props: {
                      trackedBy: 'url'
                    }
                  }
                },
                {
                  prop: 'title.show',
                  label: '显示主标题',
                  renderCell: {
                    component: 'switch'
                  },
                },
                {
                  prop: 'title.text',
                  label: '主标题',
                  renderCell: {
                    component: 'uncontrolledInput'
                  }
                },
                {
                  prop: 'subtitle.show',
                  label: '显示副标题',
                  renderCell: {
                    component: 'switch'
                  },
                },
                {
                  prop: 'subtitle.text',
                  label: '副标题',
                  renderCell: {
                    component: 'uncontrolledInput'
                  }
                },
                {
                  prop: 'desc.show',
                  label: '显示介绍',
                  renderCell: {
                    component: 'switch'
                  },
                },
                {
                  prop: 'desc.text',
                  label: '介绍',
                  renderCell: {
                    component: 'uncontrolledTextarea'
                  }
                },
                {
                  prop: 'event',
                  label: '事件设置',
                  renderCell: (h, context) => <EventForm useEvents={useEvents} pages={pages} popupComponents={popupComponents} {...context} />
                }
              ]
            }
          }
        }
      ];
      const styleColumns = [
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
          prop: 'container.textAlign',
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
        },

        {
          prop: 'image.width',
          label: parent.$t('bean.pageGenerator.imageWidth'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'image.height',
          label: parent.$t('bean.pageGenerator.imageHeight'),
          renderCell: 'inputNumber'
        },

        {
          prop: 'title.fontSize',
          label: parent.$t('bean.pageGenerator.titleFontSize'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'title.color',
          label: parent.$t('bean.pageGenerator.titleTextColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'title.lineHeight',
          label: parent.$t('bean.pageGenerator.titleLineHeight'),
          renderCell: 'inputNumber'
        },

        {
          prop: 'subtitle.fontSize',
          label: parent.$t('bean.pageGenerator.subtitleFontSize'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'subtitle.color',
          label: parent.$t('bean.pageGenerator.subtitleTextColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'subtitle.lineHeight',
          label: parent.$t('bean.pageGenerator.subtitleLineHeight'),
          renderCell: 'inputNumber'
        },

        {
          prop: 'desc.fontSize',
          label: parent.$t('bean.pageGenerator.desTextFontSize'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'desc.color',
          label: parent.$t('bean.pageGenerator.desTextColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'desc.lineHeight',
          label: parent.$t('bean.pageGenerator.desTextLineHeight'),
          renderCell: 'inputNumber'
        },
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

  get itemStyle() {
    return getStyle({
      width: _.get(this, 'value.style.image.width'),
    }, this.pageWidth);
  }

  getStyle(key) {
    return getStyle(_.get(this, `value.style.${key}`) || {}, this.pageWidth);
  }
}
</script>
