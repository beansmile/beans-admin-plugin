<template>
  <div class="page-editor-image">
    <Animation :type="$get(value, 'animation.type', '')">
      <div class="preview" :style="containerStyle">
        <img :src="value.image" :style="style" />
      </div>
    </Animation>

    <Controller
      event
      animation
      is-image
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
  import Animation from '../animation';

  const defaultValue = {
    image: 'https://via.placeholder.com/200x200/ccc',
    style: {
      image: {
        width: 100,
      },
      container: {
        textAlign: 'left'
      }
    }
  }

  @Component({
    components: {
      Controller,
      Animation
    }
  })
  export default class PageEditorImage extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: [Array, Function], default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      return {
        ...getStyle(_.get(this, 'value.style.image') || {}),
        width: _.get(this, 'value.style.image.width') + '%'
      };
    }

    get containerStyle() {
      return getStyle(_.get(this, 'value.style.container') || {});
    }

    get baseConfigColumns() {
      return [
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
      ]
    }

    styleConfigColumns = [
      {
        prop: 'image.width',
        label: '图片宽(%)',
        renderCell: {
          component: 'inputNumber',
          hint: '相对于容器宽度百分比',
          props: {
            max: 100
          }
        }
      },
      {
        prop: 'container.textAlign',
        label: '对齐方式',
        renderCell: {
          component: 'select',
          props: {
            options: [
              {
                label: '左对齐',
                value: 'left'
              },
              {
                label: '居中对齐',
                value: 'center'
              },
              {
                label: '右',
                value: 'right'
              }
            ]
          }
        }
      },
      {
        prop: 'container.paddingTop',
        label: '上间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'container.paddingBottom',
        label: '下间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'container.paddingLeft',
        label: '左间距',
        renderCell: 'inputNumber'
      },
      {
        prop: 'container.paddingRight',
        label: '右间距',
        renderCell: 'inputNumber'
      }
    ]

  }
</script>
