<template>
  <div class="page-editor-multiple-image">
    <div class="preview" :style="style">
      <div class="item" v-for="(item, index) in value.items" :key="index" :style="imageStyle">
        <img :src="item.image" />
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

  @Component({
    components: {
      Controller
    }
  })
  export default class PageEditorMultipleImage extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: Array, default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      return getStyle(_.get(this, 'value.style.container') || {});
    }

    get imageStyle() {
      return getStyle(_.get(this, 'value.style.image') || {});
    }

    get baseConfigColumns() {
      return [
        {
          prop: 'items',
          label: '图片列表',
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
                  prop: 'event',
                  label: '',
                  renderCell: (h, context) => <EventForm is-image pages={this.pages} popupComponents={this.popupComponents} {...context} />
                }
              ]
            }
          }
        }
      ];
    }

    styleConfigColumns = [
      {
        prop: 'image.marginRight',
        label: '图片间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'container.alignItems',
        label: '垂直对齐',
        renderCell: {
          component: 'select',
          props: {
            options: [
              {
                label: '上对齐',
                value: 'flex-start'
              },
              {
                label: '下对齐',
                value: 'flex-end'
              },
              {
                label: '居中对齐',
                value: 'center'
              }
            ]
          }
        }
      },
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
      }
    ]

  }
</script>

<style lang="scss" scoped>
  .preview {
    display: flex;

    .item {
      flex: 1;

      &:last-child {
        margin-right: 0 !important;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>
