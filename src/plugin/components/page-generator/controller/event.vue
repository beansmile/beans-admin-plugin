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
          label: this.$t('bean.pageGenerator.navigateType'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: this.$t('bean.pageGenerator.miniprogramPage'),
                  value: 'mp_link'
                },
                {
                  label: this.$t('bean.pageGenerator.externalMiniprogramPage'),
                  value: 'external_mp_link'
                },
                {
                  label: this.$t('bean.pageGenerator.webviewPage'),
                  value: 'web_link'
                }
              ]
            }
          },
        },
        {
          prop: 'link',
          label: this.$t('bean.pageGenerator.selectPage'),
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
          label: this.$t('bean.pageGenerator.webviewLink'),
          if: navType === 'web_link',
          renderCell: 'uncontrolledInput'
        },
        {
          prop: 'appid',
          if: navType === 'external_mp_link',
          label: this.$t('bean.pageGenerator.externalMiniprogramPageAppid'),
          renderCell: 'uncontrolledInput'
        },
        {
          prop: 'external_mp_link',
          if: navType === 'external_mp_link',
          label: this.$t('bean.pageGenerator.externalMiniprogramPagePath'),
          renderCell: 'uncontrolledInput'
        }
      ].filter(item => item.if !== false);
    }

    get addressTypeColumns() {
      return [
        {
          prop: 'address',
          label: this.$t('bean.pageGenerator.address'),
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
          label: this.$t('bean.pageGenerator.longitude'),
          renderCell: {
            component: 'uncontrolledInput',
            props: {
              disabled: true
            }
          }
        },
        {
          prop: 'latitude',
          label: this.$t('bean.pageGenerator.latitude'),
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
          label: this.$t('bean.pageGenerator.selectEvent'),
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
                  label: this.$t('bean.pageGenerator.navigateToPage'),
                  value: 'link'
                },
                {
                  label: this.$t('bean.pageGenerator.makePhoneCall'),
                  value: 'tel'
                },
                {
                  label: this.$t('bean.pageGenerator.openMap'),
                  value: 'address'
                },
                {
                  label: this.$t('bean.pageGenerator.shareWithFriend'),
                  value: 'share'
                },
                {
                  label: this.$t('bean.pageGenerator.shareByPoster'),
                  value: 'poster',
                },
                {
                  label: this.$t('bean.pageGenerator.contact'),
                  value: 'contact'
                },
                !this.isPopup && {
                  label: this.$t('bean.pageGenerator.popup'),
                  value: 'popup'
                },
                this.isImage && {
                  label: this.$t('bean.pageGenerator.previewImage'),
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
          label: this.$t('bean.pageGenerator.phoneNumber'),
          renderCell: {
            component: 'uncontrolledInput'
          }
        },
        eventName === 'popup' && {
          prop: 'popup',
          label: this.$t('bean.pageGenerator.selectPopup'),
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
