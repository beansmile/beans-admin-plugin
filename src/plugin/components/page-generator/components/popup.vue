<template>
  <div class="page-editor-popup">
    <div class="preview" v-if="showController">
      <div class="mask" />

      <div class="popup">
        <div class="content" :style="style">
          <img :src="value.image" :style="{ borderRadius: style.borderRadius }" class="img" />
        </div>
        <div class="btn-close">
          <i class="el-icon-circle-close"></i>
        </div>
      </div>
    </div>

    <Controller
      event
      is-popup
      :popup-components="popupComponents"
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

  const defaultValue = {
    name: '弹窗',
    image: 'https://via.placeholder.com/200x200/fff',
    autoOpen: false,
    showTimes: 1,
    closeBtnTriggerEvent: true,
    style: {
      backgroundColor: '#fff',
      height: 200,
      borderRadius: 6
    }
  }

  @Component({
    components: {
      Controller
    }
  })
  export default class PageEditorPopup extends Vue {
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
          prop: 'name',
          label: this.$t('bean.pageGenerator.popupName'),
          renderCell: 'uncontrolledInput'
        },
        {
          prop: 'autoOpen',
          label: this.$t('bean.pageGenerator.popupAutoOpen'),
          renderCell: 'switch'
        },
        {
          prop: 'showTimes',
          label: this.$t('bean.pageGenerator.popupShowTimes'),
          renderCell: {
            component: 'inputNumber',
            hint: this.$t('bean.pageGenerator.popupShowTimesTip'),
            props: {
              min: 1
            }
          }
        },
        {
          prop: 'closeBtnTriggerEvent',
          label: this.$t('bean.pageGenerator.popupCloseButtonTriggerEvent'),
          renderCell: {
            component: 'switch',
            hint: this.$t('bean.pageGenerator.popupCloseButtonTip'),
          }
        },
        {
          prop: 'image',
          label: this.$t('bean.pageGenerator.image'),
          renderCell: {
            component: 'upload',
            props: {
              trackedBy: 'url'
            }
          }
        }
      ];
    }

    get styleConfigColumns() {
      return [
        {
          prop: 'height',
          label: this.$t('bean.pageGenerator.popupRenderHeight'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'borderRadius',
          label: this.$t('bean.pageGenerator.popupBorderRadius'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'backgroundColor',
          label: this.$t('bean.pageGenerator.backgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        }
      ];
    }
  }
</script>
