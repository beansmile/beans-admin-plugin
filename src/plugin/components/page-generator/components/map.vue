<template>
  <div class="page-editor-map">
    <Animation :type="$get(value, 'animation.type', '')">
      <div class="preview" :style="style">
        <div class="map" ref="map"></div>
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
  import { getStyle, jsonpRequest, getQQMapPlaceSuggestions } from '../utils';
  import Controller from '../controller';
  import Animation from '../animation';

  const defaultValue = {
    style: {
      height: 200,
      paddingTop: 20,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 20
    }
  }

  @Component({
    components: {
      Controller,
      Animation
    }
  })
  export default class PageEditorMap extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: [Array, Function], default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      return getStyle(_.get(this, 'value.style') || {});
    }

    get baseConfigColumns() {
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
                this.syncValue({
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
            component: 'inputNumber',
            props: {
              disabled: true
            }
          }
        },
        {
          prop: 'latitude',
          label: '纬度',
          renderCell: {
            component: 'inputNumber',
            props: {
              disabled: true
            }
          }
        }
      ];
    }

    styleConfigColumns = [
      {
        prop: 'height',
        label: '高度',
        renderCell: 'inputNumber'
      },
      {
        prop: 'paddingTop',
        label: '上间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'paddingBottom',
        label: '下间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'paddingLeft',
        label: '左间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'paddingRight',
        label: '右间距',
        renderCell: 'inputNumber'
      }
    ]

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
