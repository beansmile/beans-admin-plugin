<template>
  <div class="page-editor-swiper">
    <Animation :type="$get(value, 'animation.type', '')">
      <div class="preview" :style="style">
        <div class="box-indiator" v-if="value.indicatorDots">
          <div
            class="item"
            :class="{ active: index === active }"
            v-for="(item, index) in value.items"
            :key="index"
            :style="{ backgroundColor: index === active ? value.indicatorColor : value.indicatorActiveColor }"
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
    </Animation>

    <Controller
      animation
      :visible="showController"
      :value="value"
      :pages="pages"
      :columns="baseConfigColumns"
      :styleColumns="styleConfigColumns"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';
  import { getStyle } from '../utils';
  import { arrayMove } from '../../../utils';
  import EventForm from '../controller/event';
  import Controller from '../controller';
  import Animation from '../animation';

  const defaultValue = {
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

  @Component({
    components: {
      Controller,
      Animation
    }
  })
  export default class PageEditorSwiper extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: [Array, Function], default: () => ([]) }) pages;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;
    @Prop(Boolean) showController;

    active = 0;

    get style() {
      return getStyle(_.get(this, 'value.style') || {});
    }

    get textContainerStyle() {
      return getStyle(_.get(this, 'value.style.textContainer') || {});
    }

    get textStyle() {
      return getStyle(_.get(this, 'value.style.text') || {});
    }

    get $get() {
      return _.get;
    }

    get baseConfigColumns() {
      return [
        {
          prop: 'indicatorDots',
          label: this.$t('bean.pageGenerator.indicatorDots'),
          renderCell: {
            component: 'switch'
          }
        },
        {
          prop: 'indicatorColor',
          label: this.$t('bean.pageGenerator.indicatorColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'indicatorActiveColor',
          label: this.$t('bean.pageGenerator.indicatorActiveColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'autoplay',
          label: this.$t('bean.pageGenerator.swiperAutoplay'),
          renderCell: {
            component: 'switch'
          }
        },
        {
          prop: 'interval',
          label: `${this.$t('bean.pageGenerator.swiperInterval')}(s)`,
          renderCell: {
            component: 'inputNumber'
          }
        },
        {
          prop: 'duration',
          label: `${this.$t('bean.pageGenerator.swiperDuration')}(s)`,
          renderCell: {
            component: 'inputNumber',
            props: {
              step: 0.1
            }
          }
        },
        {
          prop: 'circular',
          label: this.$t('bean.pageGenerator.swiperCircular'),
          renderCell: {
            component: 'switch',
            hint: `(${this.$t('bean.pageGenerator.noPreviewResult')})`
          }
        },
        {
          prop: 'items',
          label: this.$t('bean.pageGenerator.addImage'),
          renderCell: {
            component: 'nestForm',
            props: {
              columns: (item, index) => {
                const items = _.get(this.value, 'items') || [];
                return [
                  items.length > 1 && {
                    prop: '_position',
                    label: this.$t('bean.pageGenerator.sort'),
                    renderCell: (h) => {
                      return (
                        <div>
                          { !!items[index - 1] && <el-button h={h} type="danger" onClick={() => this.handleSortItem(index, index - 1)}>{ this.$t('bean.pageGenerator.moveForward') }</el-button> }
                          { !!items[index + 1]  && <el-button type="warning" onClick={() => this.handleSortItem(index, index + 1)}>{ this.$t('bean.pageGenerator.moveBack') }</el-button> }
                        </div>
                      )
                    }
                  },
                  {
                    prop: 'image',
                    label: this.$t('bean.pageGenerator.image'),
                    renderCell: {
                      component: 'upload',
                      props: {
                        trackedBy: 'url'
                      }
                    }
                  },
                  {
                    prop: 'text',
                    label: this.$t('bean.pageGenerator.text'),
                    renderCell: {
                      component: 'uncontrolledInput'
                    }
                  },
                  {
                    prop: 'event',
                    label: '',
                    renderCell: (h, context) => <EventForm is-image pages={this.pages} popupComponents={this.popupComponents} {...context} />
                  }
                ].filter(Boolean);
              }
            }
          }
        }
      ]
    }

    get styleConfigColumns() {
      return [
        {
          prop: 'height',
          label: this.$t('bean.pageGenerator.height'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'paddingTop',
          label: this.$t('bean.pageGenerator.paddingTop'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'paddingBottom',
          label: this.$t('bean.pageGenerator.paddingBottom'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'paddingLeft',
          label: this.$t('bean.pageGenerator.paddingLeft'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'paddingRight',
          label: this.$t('bean.pageGenerator.paddingRight'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'textContainer.backgroundColor',
          label: this.$t('bean.pageGenerator.swiperTextBackgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'textContainer.paddingTop',
          label: this.$t('bean.pageGenerator.swiperTextBackgroundColor'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'textContainer.paddingBottom',
          label: this.$t('bean.pageGenerator.swiperTextPaddingBottom'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'textContainer.paddingLeft',
          label: this.$t('bean.pageGenerator.swiperTextPaddingLeft'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'textContainer.paddingRight',
          label: this.$t('bean.pageGenerator.swiperTextPaddingRight'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'text.color',
          label: this.$t('bean.pageGenerator.fontColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'text.fontSize',
          label: this.$t('bean.pageGenerator.fontSize'),
          renderCell: {
            component: 'inputNumber'
          }
        }
      ];
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
