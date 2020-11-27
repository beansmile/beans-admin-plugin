<template>
  <div>
    <AdminForm
      label-width="80px"
      :columns="columns"
      :value="value"
      @change="$emit('change', $event)"
    >
      <template v-slot:action>
        <span />
      </template>
    </AdminForm>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import AdminForm from '../../form';
  import _ from 'lodash';
  import { getQQMapPlaceSuggestions } from '../utils';

  @Component({
    components: {
      AdminForm
    }
  })
  export default class PageEditorEvent extends Vue {
    @Prop({ type: Object, default: () => ({}) }) value;
    @Prop({ type: [Array, Function], default: () => [] }) pages;
    @Prop({ type: Array, default: () => [] }) popupComponents;
    @Prop(Boolean) isImage;
    @Prop(Boolean) isPopup;

    get linkTypeColumns() {
      const navType = _.get(this.value, 'navType');

      return [
        {
          prop: 'navType',
          label: '跳转类型',
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: '小程序内页',
                  value: 'mp_link'
                },
                {
                  label: '其他小程序页面',
                  value: 'external_mp_link'
                },
                {
                  label: 'webview页面',
                  value: 'web_link'
                }
              ]
            }
          },
        },
        {
          prop: 'link',
          label: '选择页面',
          if: navType === 'mp_link',
          renderCell: _.isArray(this.pages) ? {
            component: 'select',
            props: {
              options: this.pages.map(item => ({
                label: item.title,
                value: item.id
              }))
            }
          } : this.pages
        },
        {
          prop: 'web_link',
          label: 'webview地址',
          if: navType === 'web_link',
          renderCell: 'uncontrolledInput'
        },
        {
          prop: 'appid',
          if: navType === 'external_mp_link',
          label: '跳转小程序的appid',
          renderCell: 'uncontrolledInput'
        },
        {
          prop: 'external_mp_link',
          if: navType === 'external_mp_link',
          label: '跳转小程序的页面路径',
          renderCell: 'uncontrolledInput'
        }
      ].filter(item => item.if !== false);
    }

    get addressTypeColumns() {
      return [
        {
          prop: 'address',
          label: '地址名',
          renderCell: {
            component: 'el-autocomplete',
            domProps: {
              style: 'width: 100%'
            },
            props: {
              'fetch-suggestions': async (keyword, cb) => {
                const data = await getQQMapPlaceSuggestions(keyword);
                cb(data);
              }
            },
            on: {
              select: (item) => {
                this.$emit('change', {
                  ...this.value,
                  address: item.value,
                  longitude: item.longitude,
                  latitude: item.latitude
                });
              }
            }
          }
        },
        {
          prop: 'longitude',
          label: '经度',
          renderCell: {
            component: 'uncontrolledInput',
            props: {
              disabled: true
            }
          }
        },
        {
          prop: 'latitude',
          label: '纬度',
          renderCell: {
            component: 'uncontrolledInput',
            props: {
              disabled: true
            }
          }
        }
      ]
    }

    get columns() {
      const eventName = _.get(this.value, 'name');

      return [
        {
          label: '选择事件',
          prop: 'name',
          renderCell: {
            component: 'select',
            domProps: {
              style: 'width: 100%'
            },
            props: {
              clearable: true,
              options: [
                {
                  label: '跳转页面',
                  value: 'link'
                },
                {
                  label: '拨打电话',
                  value: 'tel'
                },
                {
                  label: '打开地图查看地址',
                  value: 'address'
                },
                {
                  label: '分享给好友(触发页面设置分享)',
                  value: 'share'
                },
                {
                  label: '生成海报(触发页面设置生成海报)',
                  value: 'poster',
                },
                !this.isPopup && {
                  label: '弹窗',
                  value: 'popup'
                },
                this.isImage && {
                  label: '图片预览',
                  value: 'image-preview'
                }
              ].filter(Boolean)
            }
          }
        },
        ...(eventName === 'link' ? this.linkTypeColumns : []),
        ...(eventName === 'address' ? this.addressTypeColumns : []),
        eventName === 'tel' && {
          prop: 'tel',
          label: '电话号码',
          renderCell: {
            component: 'uncontrolledInput'
          }
        },
        eventName === 'popup' && {
          prop: 'popup',
          label: '选择弹窗',
          renderCell: {
            component: 'select',
            props: {
              options: this.popupComponents.map(item => ({
                label: _.get(item, 'config.name'),
                value: item.key
              }))
            }
          }
        }
      ].filter(Boolean);
    }

  }
</script>
