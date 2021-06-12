<template>
  <div class="page-editor-multiple-image">
    <Animation :type="$get(value, 'animation.type', '')">
      <div class="preview" :style="style">
        <div class="item" v-for="(item, index) in value.items" :key="index" :style="imageStyle">
          <img :src="item.image" />
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
      Controller,
      Animation
    }
  })
  export default class PageEditorMultipleImage extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: [Array, Function], default: () => ([]) }) pages;
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
          label: this.$t('bean.pageGenerator.imageList'),
          renderCell: {
            component: 'nestForm',
            props: {
              columns: [
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

    get styleConfigColumns() {
      return [
        {
          prop: 'image.marginRight',
          label: this.$t('bean.pageGenerator.imageSpacing'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'container.alignItems',
          label: this.$t('bean.pageGenerator.verticalAlignment'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: this.$t('bean.pageGenerator.alignTop'),
                  value: 'flex-start'
                },
                {
                  label: this.$t('bean.pageGenerator.alignBottom'),
                  value: 'flex-end'
                },
                {
                  label: this.$t('bean.pageGenerator.alignCenter'),
                  value: 'center'
                }
              ]
            }
          }
        },
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
        }
      ];
    }

  }
</script>
