<template>
  <div class="page-creator-navbar">
    <div class="page-creator-navbar__item" :class="{ active: item.selected }" :style="[style, item.selected && selectedStyle]" v-for="(item, index) in value.items" :key="index">
      <span>{{ item.text }}</span>
      <span class="page-creator-navbar__item__line" v-if="value.type === '2' && item.selected" :style="selectedLineStyle"></span>
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
export default class PageCreatorNavbar extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;

  static defaultValue = {
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

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent, props: { pages, useEvents, popupComponents } } = context;
      const configColumns = [
        {
          prop: 'type',
          label: parent.$t('bean.pageGenerator.navbarType'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  value: '1',
                  label: parent.$t('bean.pageGenerator.navbarType1')
                },
                {
                  value: '2',
                  label: parent.$t('bean.pageGenerator.navbarType2')
                }
              ]
            }
          }
        },
        {
          prop: 'items',
          label: parent.$t('bean.pageGenerator.navbarItems'),
          renderCell: {
            component: 'nestForm',
            props: {
              columns: [
                {
                  prop: 'text',
                  label: parent.$t('bean.pageGenerator.text'),
                  renderCell: 'uncontrolledInput'
                },
                {
                  prop: 'selected',
                  label: parent.$t('bean.pageGenerator.isSelected'),
                  renderCell: 'switch'
                },
                {
                  prop: 'event',
                  label: '',
                  renderCell: (h, context) => <EventForm useEvents={useEvents} pages={pages} popupComponents={popupComponents} {...context} />
                }
              ]
            }
          }
        }
      ];
      const styleColumns = [
        {
          prop: 'backgroundColor',
          label: parent.$t('bean.pageGenerator.backgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'paddingTop',
          label: parent.$t('bean.pageGenerator.paddingTop'),
          renderCell: {
            component: 'inputNumber'
          }
        },
        {
          prop: 'paddingBottom',
          label: parent.$t('bean.pageGenerator.paddingBottom'),
          renderCell: {
            component: 'inputNumber'
          }
        },
        {
          prop: 'fontSize',
          label: parent.$t('bean.pageGenerator.fontSize'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'color',
          label: parent.$t('bean.pageGenerator.fontColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'selected.color',
          label: parent.$t('bean.pageGenerator.selectedStateColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
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

  get style() {
    return getStyle(_.get(this, 'value.style') || {}, this.pageWidth);
  }

  get selectedStyle() {
    return getStyle(_.get(this, 'value.style.selected') || {}, this.pageWidth);
  }

  get selectedLineStyle() {
    return {
      backgroundColor: _.get(this, 'value.style.selected.color')
    }
  }
}
</script>
