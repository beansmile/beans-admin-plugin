<template>
  <div classs="page-editor-swiper">
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
    @Prop({ type: Array, default: () => ([]) }) pages;
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
          label: '显示面板指示点',
          renderCell: {
            component: 'switch'
          }
        },
        {
          prop: 'indicatorColor',
          label: '指示点颜色',
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'indicatorActiveColor',
          label: '当前选中的指示点颜色',
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'autoplay',
          label: '自动切换',
          renderCell: {
            component: 'switch'
          }
        },
        {
          prop: 'interval',
          label: '自动切换时间间隔(秒)',
          renderCell: {
            component: 'inputNumber'
          }
        },
        {
          prop: 'duration',
          label: '滑动动画时长(秒)',
          renderCell: {
            component: 'inputNumber',
            props: {
              step: 0.1
            }
          }
        },
        {
          prop: 'circular',
          label: '是否采用衔接滑动',
          renderCell: {
            component: 'switch',
            hint: '(无预览效果)'
          }
        },
        {
          prop: 'items',
          label: '添加图片',
          renderCell: {
            component: 'nestForm',
            props: {
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
                  prop: 'text',
                  label: '文本',
                  renderCell: {
                    component: 'uncontrolledInput'
                  }
                },
                {
                  prop: 'event',
                  label: '',
                  renderCell: (h, context) => <EventForm is-image pages={this.pages} popupComponents={this.popupComponents} {...context} />
                }
              ]
            }
          }
        }
      ]
    }

    styleConfigColumns = [
      {
        prop: 'height',
        label: '高度',
        renderCell: 'inputNumber'
      },
      {
        prop: 'paddingTop',
        label: '上间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'paddingBottom',
        label: '下间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'paddingLeft',
        label: '左间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'paddingRight',
        label: '右间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'textContainer.backgroundColor',
        label: '文字栏背景色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      },
      {
        prop: 'textContainer.paddingTop',
        label: '文字栏上间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'textContainer.paddingBottom',
        label: '文字栏下间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'textContainer.paddingLeft',
        label: '文字栏左间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'textContainer.paddingRight',
        label: '文字栏右间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'text.color',
        label: '文字颜色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      },
      {
        prop: 'text.fontSize',
        label: '文字大小',
        renderCell: {
          component: 'inputNumber'
        }
      }
    ]

    handleSwiperChange(e) {
      this.active = e;
    }
  }
</script>

<style lang="scss" scoped>
  .preview {
    position: relative;

    .box-indiator {
      position: absolute;
      left: 50%;
      bottom: 10px;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      z-index: 9;

      .item {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(0, 0, 0, .3);
        margin-right: 7px;

        &:last-child {
          margin-right: 0;
        }

        &.active {
          background: #000000;
        }
      }
    }

    .el-carousel {
      height: 100%;

      /deep/ .el-carousel__container {
        height: 100%;
        overflow: hidden;
      }

      .item {
        width: 100%;
        height: 100%;
        position: relative;

        .item-image {
          width: 100%;
          height: auto;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          z-index: 1;
        }

        .box-text {
          box-sizing: border-box;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          z-index: 2;

          span {
            display: block;
          }
        }
      }
    }
  }
</style>
