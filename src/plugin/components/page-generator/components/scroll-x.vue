<template>
  <div class="page-editor-scroll-x">
    <Animation :type="$get(value, 'animation.type', '')">
      <div class="preview" :style="getStyle('container')">
        <div class="item" v-for="(item, index) in value.items" :key="index" :style="itemStyle">
          <img :src="item.image" :style="getStyle('image')" />
          <div v-if="item.title.show" :style="getStyle('title')">{{ item.title.text }}</div>
          <div v-if="item.subtitle.show" :style="getStyle('subtitle')">{{ item.subtitle.text }}</div>
          <div v-if="item.desc.show" :style="getStyle('desc')">{{ item.desc.text }}</div>
        </div>
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
  import Controller from '../controller';
  import EventForm from '../controller/event';
  import Animation from '../animation';

  const defaultValue = {
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

  @Component({
    components: {
      Controller,
      Animation
    }
  })
  export default class PageEditorScrollX extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: [Array, Function], default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    getStyle(key) {
      return getStyle(_.get(this, `value.style.${key}`) || {});
    }

    get itemStyle() {
      return {
        width: _.get(this, 'value.style.image.width') + 'px'
      }
    }

    get baseConfigColumns() {
      return [
        {
          prop: 'items',
          label: '添加图片',
          renderCell: {
            component: 'nestForm',
            attrs: {
              'label-position': 'left',
              'label-width': 'auto'
            },
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
                  renderCell: (h, context) => <EventForm pages={this.pages} popupComponents={this.popupComponents} {...context} />
                }
              ]
            }
          }
        }
      ];
    }

    get styleConfigColumns() {
      return [
        {
          prop: 'container.backgroundColor',
          label: this.$t('bean.pageGenerator.backgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'container.textAlign',
          label: this.$t('bean.pageGenerator.textAlign'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  value: 'left',
                  label: this.$t('bean.pageGenerator.alignLeft'),
                },
                {
                  value: 'right',
                  label: this.$t('bean.pageGenerator.alignRight'),
                },
                {
                  value: 'center',
                  label: this.$t('bean.pageGenerator.alignCenter'),
                }
              ]
            }
          }
        },
        {
          prop: 'container.paddingTop',
          label: this.$t('bean.pageGenerator.paddingTop'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'container.paddingBottom',
          label: this.$t('bean.pageGenerator.paddingBottom'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'container.paddingLeft',
          label: this.$t('bean.pageGenerator.paddingLeft'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'container.paddingRight',
          label: this.$t('bean.pageGenerator.paddingRight'),
          renderCell: 'inputNumber'
        },

        {
          prop: 'image.width',
          label: this.$t('bean.pageGenerator.imageWidth'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'image.height',
          label: this.$t('bean.pageGenerator.imageHeight'),
          renderCell: 'inputNumber'
        },

        {
          prop: 'title.fontSize',
          label: this.$t('bean.pageGenerator.titleFontSize'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'title.color',
          label: this.$t('bean.pageGenerator.titleTextColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'title.lineHeight',
          label: this.$t('bean.pageGenerator.titleLineHeight'),
          renderCell: 'inputNumber'
        },

        {
          prop: 'subtitle.fontSize',
          label: this.$t('bean.pageGenerator.subtitleFontSize'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'subtitle.color',
          label: this.$t('bean.pageGenerator.subtitleTextColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'subtitle.lineHeight',
          label: this.$t('bean.pageGenerator.subtitleLineHeight'),
          renderCell: 'inputNumber'
        },

        {
          prop: 'desc.fontSize',
          label: this.$t('bean.pageGenerator.desTextFontSize'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'desc.color',
          label: this.$t('bean.pageGenerator.desTextColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'desc.lineHeight',
          label: this.$t('bean.pageGenerator.desTextLineHeight'),
          renderCell: 'inputNumber'
        },
      ]
    }
  }
</script>
