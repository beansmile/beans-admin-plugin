<template>
  <div class="admin-page-editor-screen">
    <div class="preview">
      <div class="title" :style="titleStyle">
        <span>{{ $get(page, 'config.title') }}</span>
      </div>
      <div class="content">
        <div class="preview-scroll-y" :style="[{ height: '100%', boxSizing: 'border-box', overflowY: 'auto' }, style]">
          <Preview
            :show-controller="!!activeKey"
            :pages="pages"
            :page="page"
            :active-key="activeKey"
            :all-components="components"
            v-on="$listeners"
          >
            <slot />
          </Preview>
        </div>
      </div>
    </div>

    <Controller
      :visible="!activeKey"
      :value="page.config"
      :columns="columns"
      :styleColumns="styleColumns"
      @change="handleConfigChange"
    />
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';
  import { getStyle } from './utils';
  import Controller from './controller';
  import Preview from './preview';

  @Component({
    components: {
      Controller,
      Preview
    }
  })
  export default class PageEditorScreen extends Vue {
    @Prop({ type: [Array, Function], default: () => [] }) pages;
    @Prop(Object) page;
    @Prop(String) activeKey;
    @Prop(Array) components;

    get style() {
      return getStyle(_.get(this.page, 'config.style') || {});
    }

    get titleStyle() {
      return getStyle(_.get(this.page, 'config.style.title') || {});
    }

    get columns() {
      return [
        {
          prop: 'title',
          label: this.$t('bean.pageGenerator.title'),
          renderCell: 'uncontrolledInput'
        },
        {
          prop: 'share.title',
          label: this.$t('bean.pageGenerator.shareTitle'),
          renderCell: 'uncontrolledInput'
        },
        {
          prop: 'share.imageUrl',
          label: this.$t('bean.pageGenerator.shareImage'),
          renderCell: {
            component: 'upload',
            props: {
              trackedBy: 'url'
            }
          }
        },
        {
          prop: 'poster.backgroundImage',
          label: this.$t('bean.pageGenerator.posterBackgroundImage'),
          renderCell: {
            component: 'upload',
            hint: this.$t('bean.pageGenerator.imageSize', { size: '300 x 400' }),
            props: {
              trackedBy: 'url',
              cropper: {
                width: 300,
                height: 400
              }
            }
          }
        },
        {
          prop: 'poster.backgroundColor',
          label: this.$t('bean.pageGenerator.posterBackgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'poster.text',
          label: this.$t('bean.pageGenerator.posterText'),
          renderCell: {
            component: 'uncontrolledInput'
          }
        },
        {
          prop: 'poster.textColor',
          label: this.$t('bean.pageGenerator.posterTextColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        }
      ];
    }

    get styleColumns() {
      return [
        {
          prop: 'title.backgroundColor',
          label: this.$t('bean.pageGenerator.titleBackgroundColor'),
          renderCell: {
            component: 'colorPicker'
          }
        },
        {
          prop: 'title.color',
          label: this.$t('bean.pageGenerator.titleColor'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: this.$t('bean.pageGenerator.white'),
                  value: '#ffffff'
                },
                {
                  label: this.$t('bean.pageGenerator.black'),
                  value: '#000000'
                }
              ]
            }
          }
        },
        {
          prop: 'backgroundColor',
          label: this.$t('bean.pageGenerator.backgroundColor'),
          renderCell: {
            component: 'colorPicker'
          }
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
        }
      ];
    }

    handleConfigChange(data) {
      this.$emit('update-page', 'config', data);
    }
  }
</script>
