<template>
  <div class="page-editor-navbar">
    <Animation :type="$get(value, 'animation.type', '')">
      <div class="preview">
        <div class="item" :class="{ active: item.selected }" :style="[style, item.selected && selectedStyle]" v-for="(item, index) in value.items" :key="index">
          <span>{{ item.text }}</span>
          <span class="line" v-if="value.type === '2' && item.selected" :style="selectedLineStyle"></span>
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
    type: '1',
    items: [
      {
        text: '分类1',
        selected: true
      },
      {
        text: '分类2'
      },
      {
        text: '分类3'
      }
    ],
    style: {
      backgroundColor: '#fff',
      paddingTop: 15,
      paddingBottom: 15,
      fontSize: 16,
      color: '#000',
      selected: {
        color: 'red'
      }
    }
  }

  @Component({
    components: {
      Controller,
      Animation
    }
  })
  export default class PageEditorNavBar extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: [Array, Function], default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      return getStyle(_.get(this, 'value.style') || {});
    }

    get selectedStyle() {
      return getStyle(_.get(this, 'value.style.selected') || {});
    }

    get selectedLineStyle() {
      return {
        backgroundColor: _.get(this, 'value.style.selected.color')
      }
    }

    get baseConfigColumns() {
      return [
        {
          prop: 'type',
          label: this.$t('bean.pageGenerator.navbarType'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  value: '1',
                  label: this.$t('bean.pageGenerator.navbarType1')
                },
                {
                  value: '2',
                  label: this.$t('bean.pageGenerator.navbarType2')
                }
              ]
            }
          }
        },
        {
          prop: 'items',
          label: this.$t('bean.pageGenerator.navbarItems'),
          renderCell: {
            component: 'nestForm',
            props: {
              columns: [
                {
                  prop: 'text',
                  label: this.$t('bean.pageGenerator.text'),
                  renderCell: 'uncontrolledInput'
                },
                {
                  prop: 'selected',
                  label: this.$t('bean.pageGenerator.isSelected'),
                  renderCell: 'switch'
                },
                {
                  prop: 'event',
                  label: '',
                  renderCell: (h, context) => <EventForm pages={this.pages} {...context} />
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
          prop: 'backgroundColor',
          label: this.$t('bean.pageGenerator.backgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'paddingTop',
          label: this.$t('bean.pageGenerator.paddingTop'),
          renderCell: {
            component: 'inputNumber'
          }
        },
        {
          prop: 'paddingBottom',
          label: this.$t('bean.pageGenerator.paddingBottom'),
          renderCell: {
            component: 'inputNumber'
          }
        },
        {
          prop: 'fontSize',
          label: this.$t('bean.pageGenerator.fontSize'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'color',
          label: this.$t('bean.pageGenerator.fontColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'selected.color',
          label: this.$t('bean.pageGenerator.selectedStateColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
      ];
    }

  }
</script>
