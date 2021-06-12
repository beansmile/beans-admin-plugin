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
          label: this.$t('bean.pageGenerator.image'),
          renderCell: {
            component: 'upload',
            props: {
              trackedBy: 'url'
            }
          }
        }
      ]
    }

    get styleConfigColumns() {
      return [
        {
          prop: 'image.width',
          label: `${this.$t('bean.pageGenerator.imageWidth')}(%)`,
          renderCell: {
            component: 'inputNumber',
            hint: this.$t('bean.pageGenerator.relativeWithContainerWidth'),
            props: {
              max: 100
            }
          }
        },
        {
          prop: 'container.textAlign',
          label: this.$t('bean.pageGenerator.alignType'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: this.$t('bean.pageGenerator.alignLeft'),
                  value: 'left'
                },
                {
                  label: this.$t('bean.pageGenerator.alignCenter'),
                  value: 'center'
                },
                {
                  label: this.$t('bean.pageGenerator.alignRight'),
                  value: 'right'
                }
              ]
            }
          }
        },
        {
          prop: 'container.paddingTop',
          label: this.$t('bean.pageGenerator.paddingTop'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'container.paddingBottom',
          label: this.$t('bean.pageGenerator.paddingBottom'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'container.paddingLeft',
          label: this.$t('bean.pageGenerator.paddingLeft'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'container.paddingRight',
          label: this.$t('bean.pageGenerator.paddingRight'),
          renderCell: 'inputNumber'
        }
      ]
    }

  }
</script>
