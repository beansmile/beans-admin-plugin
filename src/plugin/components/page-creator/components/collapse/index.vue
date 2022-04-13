<template>
  <div class="page-creator-collapse" :style="containerStyle">
    <el-collapse>
      <el-collapse-item v-for="(collapseItem, collapseKey) in value.items" :key="collapseKey" :style="$get(value, 'style.borderColor') && { borderBottom: `1px solid ${$get(value, 'style.borderColor')}` }">
        <template #title>
          <div class="collapse-title">
            <div class="collapse-title-content" :style="style">
              <div class="title-left">
                <img class="icon" v-if="collapseItem.icon" :src="collapseItem.icon" alt="">
                <span class="title-text">{{ $get(collapseItem, 'title') }}</span>
              </div>
              <img class="indicator-icon" v-if="value.indicatorIcon" :src="value.indicatorIcon" />
            </div>
          </div>
        </template>
        <Animation
          v-for="item in $get(collapseItem, 'config.components', [])"
          :key="item.key"
          :type="$get(item.config, 'animation.type', '')"
        >
          <component
            :is="enabledComponents[item.name].component"
            :value="item.config"
          />
        </Animation>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import _ from 'lodash';
import Controller from '../../controller';
import { getStyle } from '../../helper';
import CollapseItem from './collapse-item.vue';
import Animation from '../../animation.vue';

@Component({
  components: {
    Animation
  }
})
export default class PageCreatorCollapse extends Vue {
  @Prop(Object) value;
  @Prop({ type: Object, default: () => ({}) }) enabledComponents;
  @InjectReactive() pageWidth;

  get containerStyle() {
    const styleObj = _.get(this, 'value.style') || {};
    return getStyle(_.pick(styleObj, ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']), this.pageWidth);
  }

  get style() {
    const styleObj = _.get(this, 'value.style') || {};
    return getStyle(_.pick(styleObj, ['height', 'fontSize', 'color', 'fontWeight']), this.pageWidth);
  }

  static defaultValue = {
    indicatorIcon: 'https://via.placeholder.com/30x30/ccc',
    items: [
      {
        icon: 'https://via.placeholder.com/30x30/ccc',
        title: 'Collapse',
        config: {
          components: []
        }
      }
    ],
    style: {
      height: 70,
      fontSize: 20,
      color: '#13220F',
      fontWeight: 600,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 24,
      paddingRight: 24,
      borderColor: '#D3F2D9'
    }
  }

  static controller = {
    functional: true,
    render(h, context) {
      const { parent, props: { enabledComponents, useEvents, pages } } = context;
      const configColumns = [
        {
          prop: 'indicatorIcon',
          label: parent.$t('bean.pageGenerator.collapseIndicator'),
          renderCell: {
            component: 'upload',
            props: {
              trackedBy: 'url'
            }
          }
        },
        {
          prop: 'items',
          label: parent.$t('bean.pageGenerator.collapseItems'),
          renderCell: {
            component: 'nestForm',
            props: {
              columns: [
                {
                  prop: 'title',
                  label: parent.$t('bean.pageGenerator.collapseTitle'),
                  renderCell: 'input'
                },
                {
                  prop: 'icon',
                  label: 'icon',
                  renderCell: {
                    component: 'upload',
                    props: {
                      trackedBy: 'url'
                    }
                  }
                },
                {
                  prop: 'config',
                  label: parent.$t('bean.pageGenerator.collapseContent'),
                  renderCell: (h, context) => <CollapseItem enabledComponents={enabledComponents} useEvents={useEvents} pages={pages} {...context} />
                }
              ]
            }
          }
        },
      ];
      const styleColumns = [
        {
          prop: 'height',
          label: parent.$t('bean.pageGenerator.height'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'color',
          label: parent.$t('bean.pageGenerator.color'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'fontSize',
          label: parent.$t('bean.pageGenerator.fontSize'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'fontWeight',
          label: parent.$t('bean.pageGenerator.fontWeight'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: parent.$t('bean.pageGenerator.fontWeightNormal'),
                  value: 'normal'
                },
                {
                  label: parent.$t('bean.pageGenerator.fontWeightBold'),
                  value: 'bold'
                }
              ].concat(
                _.range(100, 1000, 100).map(item => ({
                  label: item,
                  value: item
                }))
              )
            }
          }
        },
        {
          prop: 'borderColor',
          label: parent.$t('bean.pageGenerator.borderColor'),
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
}
</script>
