<template>
  <div class="page-creator-map" :style="style">
    <div class="page-creator-map__map" ref="map"></div>
  </div>
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import _ from 'lodash';
import Controller from '../controller';
import { getStyle, getQQMapPlaceSuggestions, jsonpRequest } from '../helper';

@Component
export default class PageCreatorMap extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;

  static defaultValue = {
    style: {
      height: 200,
      paddingTop: 20,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 20
    }
  }

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent } = context;
      const configColumns = [
        {
          prop: 'address',
          label: parent.$t('bean.pageGenerator.address'),
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
                const change = _.get(context.listeners, 'change') || _.noop;
                change({
                  ...context.props.value,
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
          label: parent.$t('bean.pageGenerator.longitude'),
          renderCell: {
            component: 'inputNumber',
            props: {
              disabled: true
            }
          }
        },
        {
          prop: 'latitude',
          label: parent.$t('bean.pageGenerator.latitude'),
          renderCell: {
            component: 'inputNumber',
            props: {
              disabled: true
            }
          }
        }
      ];
      const styleColumns = [
        {
          prop: 'height',
          label: parent.$t('bean.pageGenerator.height'),
          renderCell: 'inputNumber'
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
        />
      );
    }
  }

  get style() {
    return getStyle(_.get(this, 'value.style') || {}, this.pageWidth);
  }

  async mounted() {
    this.map = new qq.maps.Map(this.$refs.map, {
      draggable: false,
      scrollwheel: false,
      zoom: 18
    });
    const { longitude, latitude } = this.value;
    if (!longitude || !latitude) {
      const { result: { location, ad_info: { province, city, district } } } = await jsonpRequest('https://apis.map.qq.com/ws/location/v1/ip', {
        key: process.env.VUE_APP_QQ_MAP_KEY,
        output: 'jsonp'
      });
      this.syncValue({
        address: [province, city, district].join(''),
        longitude: location.lng,
        latitude: location.lat
      });
    }
    this.$watch('value.longitude', async () => {
      const { longitude, latitude } = this.value;
      if (longitude && latitude) {
        await this.$nextTick();
        const point = new qq.maps.LatLng(latitude, longitude);
        if (this.marker) {
          this.marker.setMap(null);
        }
        this.marker = new qq.maps.Marker({ position: point, map: this.map });
        this.map.panTo(point);
      }
    }, { immediate: true });
  }

  syncValue(data) {
    this.$emit('change', {
      ...this.value,
      ...data
    });
  }
}
</script>
