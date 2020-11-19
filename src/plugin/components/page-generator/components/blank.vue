<template>
  <div class="page-editor-blank">
    <div class="preview" :style="style"></div>

    <Controller
      event
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
    style: {
      height: 20,
      backgroundColor: '#fff'
    }
  }

  @Component({
    components: {
      Controller
    }
  })
  export default class PageEditorBlank extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: Array, default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      return getStyle(_.get(this, 'value.style') || {});
    }

    baseConfigColumns = []

    styleConfigColumns = [
      {
        prop: 'height',
        label: '高度',
        renderCell: {
          component: 'inputNumber'
        }
      },
      {
        prop: 'backgroundColor',
        label: '背景颜色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      }
    ]

  }
</script>

<style lang="scss" scoped>


</style>
