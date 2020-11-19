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
    @Prop({ type: Array, default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      return getStyle(_.get(this, 'value.style') || {});
    }

    baseConfigColumns = [
      {
        prop: 'name',
        label: '弹窗名称',
        renderCell: 'uncontrolledInput'
      },
      {
        prop: 'autoOpen',
        label: '自动弹窗',
        renderCell: 'switch'
      },
      {
        prop: 'image',
        label: '图片',
        renderCell: {
          component: 'upload',
          props: {
            trackedBy: 'url'
          }
        }
      }
    ];

    styleConfigColumns = [
      {
        prop: 'height',
        label: '展示高度',
        renderCell: 'inputNumber'
      },
      {
        prop: 'borderRadius',
        label: '弹窗圆角',
        renderCell: 'inputNumber'
      },
      {
        prop: 'backgroundColor',
        label: '背景色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      }
    ];
  }
</script>

<style lang="scss" scoped>
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 998;
  }

  .popup {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    z-index: 999;

    .content {
      overflow: auto;
    }

    .img {
      width: 100%;
      height: auto;
    }

    .btn-close {
      margin-top: 15px;
      text-align: center;
      font-size: 30px;
      color: #fff;
    }
  }
</style>
