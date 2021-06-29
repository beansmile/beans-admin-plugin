<template>
  <EventForm
    :events="events"
    :value="value"
    label-width="80px"
    @change="$emit('change', $event)"
  />
</template>

<script>
  import { Vue, Component, Prop, Inject } from 'vue-property-decorator';
  import EventForm from '../../event-form.vue';
  import AdminForm from '../../form';
  import _ from 'lodash';
  import { getQQMapPlaceSuggestions } from '../utils';

  @Component({
    components: {
      EventForm,
      AdminForm
    }
  })
  export default class PageEditorEvent extends Vue {
    @Prop({ type: Object, default: () => ({}) }) value;
    @Prop({ type: [Array, Function], default: () => [] }) pages;
    @Prop({ type: Array, default: () => [] }) popupComponents;
    @Prop(Boolean) isImage;
    @Prop(Boolean) isPopup;
    @Inject('useEvents') useEvents;

    get telColumns() {
      return [
        {
          prop: 'tel',
          label: this.$t('bean.pageGenerator.phoneNumber'),
          renderCell: {
            component: 'uncontrolledInput'
          }
        }
      ];
    }

    get popupColumns() {
      return [
        {
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
      ];
    }

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

    get events() {
      const events = {
        link: {
          label: this.$t('bean.pageGenerator.navigateToPage'),
          columns: this.linkTypeColumns
        },
        tel: {
          label: this.$t('bean.pageGenerator.makePhoneCall'),
          columns: this.telColumns
        },
        address: {
          label: this.$t('bean.pageGenerator.openMap'),
          columns: this.addressTypeColumns
        },
        share: {
          label: this.$t('bean.pageGenerator.shareWithFriend'),
          columns: []
        },
        poster: {
          label: this.$t('bean.pageGenerator.shareByPoster'),
          columns: []
        },
        contact: {
          label: this.$t('bean.pageGenerator.contact'),
          columns: []
        },
      };
      if (!this.isPopup) {
        events.popup = {
          label: this.$t('bean.pageGenerator.popup'),
          columns: this.popupColumns
        }
      }
      if (this.isImage) {
        events['image-preview'] = {
          label: this.$t('bean.pageGenerator.previewImage'),
          columns: []
        }
      }
      if (_.isArray(this.useEvents)) {
        const useEvents = {};
        this.useEvents.forEach(item => {
          if (_.isString(item) && events[item]) {
            useEvents[item] = events[item];
          } else if (_.isPlainObject(item) && item.key) {
            useEvents[item.key] = item;
          }
        });
        return useEvents;
      }
      return events;
    }
  }
</script>
