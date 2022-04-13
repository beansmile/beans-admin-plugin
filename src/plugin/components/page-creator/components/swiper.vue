<template>
  <div class="page-creator-swiper" :style="style">
    <div class="box-indiator" v-if="value.indicatorDots">
      <div
        class="item"
        :class="{ active: index === active }"
        v-for="(item, index) in value.items"
        :key="index"
        :style="{ backgroundColor: index === active ? value.indicatorActiveColor : value.indicatorColor }"
      >
      </div>
    </div>

    <el-carousel
      trigger="click"
      :autoplay="value.autoplay"
      :interval="value.interval * 1000"
      arrow="never"
      indicator-position="none"
      @change="handleSwiperChange"
    >
      <el-carousel-item v-for="(item, index) in value.items" :key="index">
        <div class="item" style="width: 100%; height: 100%;">
          <img :src="item.image" class="item-image" />
          <div class="box-text" :style="textContainerStyle" v-if="item.text">
            <span :style="textStyle">{{ item.text }}</span>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import _ from 'lodash';
import Controller from '../controller';
import { getStyle } from '../helper';
import EventForm from '../event';
import { arrayMove } from '../../../utils';

@Component
export default class PageCreatorSwiper extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;

  active = 0;

  static defaultValue = {
    indicatorDots: true,
    indicatorColor: 'rgba(0, 0, 0, .3)',
    indicatorActiveColor: '#000',
    interval: 3,
    duration: 0.5,
    autoplay: true,
    circular: true,
    items: [
      {
        image: 'https://via.placeholder.com/240x240/ccc'
      },
      {
        image: 'https://via.placeholder.com/240x240/ccc'
      }
    ],
    style: {
      height: 240,
      textContainer: {
        backgroundColor: 'rgba(0, 0, 0, .3)',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        paddingBottom: 15
      },
      text: {
        color: '#fff',
        fontSize: 16
      }
    }
  }

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent, props: { pages, popupComponents, useEvents } } = context;
      const configColumns = [
        {
          prop: 'indicatorDots',
          label: parent.$t('bean.pageGenerator.indicatorDots'),
          renderCell: {
            component: 'switch'
          }
        },
        {
          prop: 'indicatorColor',
          label: parent.$t('bean.pageGenerator.indicatorColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'indicatorActiveColor',
          label: parent.$t('bean.pageGenerator.indicatorActiveColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'autoplay',
          label: parent.$t('bean.pageGenerator.swiperAutoplay'),
          renderCell: {
            component: 'switch'
          }
        },
        {
          prop: 'interval',
          label: `${parent.$t('bean.pageGenerator.swiperInterval')}(秒)`,
          renderCell: {
            component: 'inputNumber'
          }
        },
        {
          prop: 'duration',
          label: `${parent.$t('bean.pageGenerator.swiperDuration')}(秒)`,
          renderCell: {
            component: 'inputNumber',
            props: {
              step: 0.1
            }
          }
        },
        {
          prop: 'circular',
          label: parent.$t('bean.pageGenerator.swiperCircular'),
          renderCell: {
            component: 'switch',
            hint: `(${parent.$t('bean.pageGenerator.noPreviewResult')})`
          }
        },
        {
          prop: 'items',
          label: parent.$t('bean.pageGenerator.addImage'),
          renderCell: {
            component: 'nestForm',
            props: {
              columns: (item, index) => {
                const items = _.cloneDeep(_.get(context.props, 'value.items') || []);
                const handleSortItem = (fromIndex, toIndex) => {
                  const change = _.get(context.listeners, 'change') || _.noop;
                  change({
                    ...context.props.value,
                    items: arrayMove(items, fromIndex, toIndex)
                  });
                }
                return [
                  items.length > 1 && {
                    prop: '_position',
                    label: parent.$t('bean.pageGenerator.sort'),
                    renderCell: (h) => {
                      return (
                        <div>
                          { !!items[index - 1] && <el-button h={h} type="danger" onClick={() => handleSortItem(index, index - 1)}>{ parent.$t('bean.pageGenerator.moveForward') }</el-button> }
                          { !!items[index + 1]  && <el-button type="warning" onClick={() => handleSortItem(index, index + 1)}>{ parent.$t('bean.pageGenerator.moveBack') }</el-button> }
                        </div>
                      )
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
                  },
                  {
                    prop: 'text',
                    label: parent.$t('bean.pageGenerator.text'),
                    renderCell: {
                      component: 'uncontrolledInput'
                    }
                  },
                  {
                    prop: 'event',
                    label: '',
                    renderCell: (h, context) => <EventForm is-image useEvents={useEvents} pages={pages} popupComponents={popupComponents} {...context} />
                  }
                ].filter(Boolean);
              }
            }
          }
        }
      ];
      const styleColumns = [
        {
          prop: 'height',
          label: parent.$t('bean.pageGenerator.height'),
          renderCell: 'inputNumber'
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
        },
        {
          prop: 'textContainer.backgroundColor',
          label: parent.$t('bean.pageGenerator.swiperTextBackgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'textContainer.paddingTop',
          label: parent.$t('bean.pageGenerator.swiperTextBackgroundColor'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'textContainer.paddingBottom',
          label: parent.$t('bean.pageGenerator.swiperTextPaddingBottom'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'textContainer.paddingLeft',
          label: parent.$t('bean.pageGenerator.swiperTextPaddingLeft'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'textContainer.paddingRight',
          label: parent.$t('bean.pageGenerator.swiperTextPaddingRight'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'text.color',
          label: parent.$t('bean.pageGenerator.fontColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'text.fontSize',
          label: parent.$t('bean.pageGenerator.fontSize'),
          renderCell: {
            component: 'inputNumber'
          }
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
    return getStyle(_.get(this, 'value.style') || {}, this.pageWidth);
  }

  get textContainerStyle() {
    return getStyle(_.get(this, 'value.style.textContainer') || {}, this.pageWidth);
  }

  get textStyle() {
    return getStyle(_.get(this, 'value.style.text') || {}, this.pageWidth);
  }

  get $get() {
    return _.get;
  }

  handleSortItem(fromIndex, toIndex) {
    const { items = [] } = this.value;
    this.$emit('change', {
      ...this.value,
      items: arrayMove(items, fromIndex, toIndex)
    });
  }

  handleSwiperChange(e) {
    this.active = e;
  }
}
</script>
