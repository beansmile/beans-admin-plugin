<template>
  <div class="page-editor-scroll-x">
    <div class="preview" :style="getStyle('container')">
      <div class="item" v-for="(item, index) in value.items" :key="index" :style="itemStyle">
        <img :src="item.image" :style="getStyle('image')" />
        <div v-if="item.title.show" :style="getStyle('title')">{{ item.title.text }}</div>
        <div v-if="item.subtitle.show" :style="getStyle('subtitle')">{{ item.subtitle.text }}</div>
        <div v-if="item.desc.show" :style="getStyle('desc')">{{ item.desc.text }}</div>
      </div>
    </div>

    <Controller
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
  import EventForm from '../event';

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
      Controller
    }
  })
  export default class PageEditorScrollX extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: Array, default: () => ([]) }) pages;
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

    styleConfigColumns = [
      {
        prop: 'container.backgroundColor',
        label: '背景色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      },
      {
        prop: 'container.textAlign',
        label: '文字对齐',
        renderCell: {
          component: 'select',
          props: {
            options: [
              {
                value: 'left',
                label: '左对齐'
              },
              {
                value: 'right',
                label: '右对齐'
              },
              {
                value: 'center',
                label: '居中'
              }
            ]
          }
        }
      },
      {
        prop: 'container.paddingTop',
        label: '上间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'container.paddingBottom',
        label: '下间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'container.paddingLeft',
        label: '左间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'container.paddingRight',
        label: '右间距',
        renderCell: 'inputNumber'
      },

      {
        prop: 'image.width',
        label: '图片宽度',
        renderCell: 'inputNumber'
      },
      {
        prop: 'image.height',
        label: '图片高度',
        renderCell: 'inputNumber'
      },

      {
        prop: 'title.fontSize',
        label: '标题字号',
        renderCell: 'inputNumber'
      },
      {
        prop: 'title.color',
        label: '标题颜色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      },
      {
        prop: 'title.lineHeight',
        label: '标题行高',
        renderCell: 'inputNumber'
      },

      {
        prop: 'subtitle.fontSize',
        label: '副标题字号',
        renderCell: 'inputNumber'
      },
      {
        prop: 'subtitle.color',
        label: '副标题颜色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      },
      {
        prop: 'subtitle.lineHeight',
        label: '副标题行高',
        renderCell: 'inputNumber'
      },

      {
        prop: 'desc.fontSize',
        label: '介绍字号',
        renderCell: 'inputNumber'
      },
      {
        prop: 'desc.color',
        label: '介绍颜色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      },
      {
        prop: 'desc.lineHeight',
        label: '介绍行高',
        renderCell: 'inputNumber'
      },
    ]
  }
</script>

<style lang="scss" scoped>
  .preview {
    display: flex;
    overflow-x: auto;

    .item {
      margin-right: 10px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
</style>
