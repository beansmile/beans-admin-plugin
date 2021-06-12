<template>
  <div class="page-editor-video">
    <Animation :type="$get(value, 'animation.type', '')">
      <div class="preview">
        <video
          class="video"
          :style="style"
          :src="value.video"
          :controls="value.controls"
          :muted="value.muted"
          :autoplay="value.autoplay"
          :loop="value.loop"
          :poster="value.poster"
        />
      </div>
    </Animation>

    <Controller
      animation
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
    controls: true,
    style: {
      height: 210,
      objectFit: 'contain'
    }
  }

  @Component({
    components: {
      Controller,
      Animation
    }
  })
  export default class PageEditorVideo extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: [Array, Function], default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    get style() {
      return {
        width: '100%',
        boxSizing: 'border-box',
        ...getStyle(_.get(this, 'value.style') || {})
      };
    }

    get baseConfigColumns() {
      return [
        {
          prop: 'video',
          label: this.$t('bean.pageGenerator.uploadVideo'),
          renderCell: {
            component: 'upload',
            props: {
              trackedBy: 'url',
              accept: 'video/mp4',
              size: 100,
              type: 'video'
            }
          }
        },
        {
          prop: 'poster',
          label: this.$t('bean.pageGenerator.videoPoster'),
          renderCell: {
            component: 'upload',
            props: {
              trackedBy: 'url'
            }
          }
        },
        {
          prop: 'controls',
          label: this.$t('bean.pageGenerator.videoShowControls'),
          renderCell: 'switch'
        },
        {
          prop: 'autoplay',
          label: this.$t('bean.pageGenerator.videoAutoplay'),
          renderCell: 'switch'
        },
        {
          prop: 'loop',
          label: this.$t('bean.pageGenerator.videoLoop'),
          renderCell: 'switch'
        },
        {
          prop: 'muted',
          label: this.$t('bean.pageGenerator.uploadVideo'),
          renderCell: 'switch'
        }
      ];
    }

    get styleConfigColumns() {
      return [
        {
          prop: 'height',
          label: this.$t('bean.pageGenerator.height'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'objectFit',
          label: this.$t('bean.pageGenerator.objectFit'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: this.$t('bean.pageGenerator.contain'),
                  value: 'contain'
                },
                {
                  label: this.$t('bean.pageGenerator.fill'),
                  value: 'fill'
                },
                {
                  label: this.$t('bean.pageGenerator.cover'),
                  value: 'cover'
                }
              ]
            }
          }
        },
        {
          prop: 'paddingTop',
          label: this.$t('bean.pageGenerator.paddingTop'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'paddingBottom',
          label: this.$t('bean.pageGenerator.paddingBottom'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'paddingLeft',
          label: this.$t('bean.pageGenerator.paddingLeft'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'paddingRight',
          label: this.$t('bean.pageGenerator.paddingRight'),
          renderCell: 'inputNumber'
        }
      ];
    }

  }
</script>
