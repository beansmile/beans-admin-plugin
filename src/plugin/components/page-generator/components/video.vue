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

    baseConfigColumns = [
      {
        prop: 'video',
        label: '上传视频',
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
        label: '视频封面',
        renderCell: {
          component: 'upload',
          props: {
            trackedBy: 'url'
          }
        }
      },
      {
        prop: 'controls',
        label: '显示播放控件',
        renderCell: 'switch'
      },
      {
        prop: 'autoplay',
        label: '自动播放',
        renderCell: 'switch'
      },
      {
        prop: 'loop',
        label: '循环播放',
        renderCell: 'switch'
      },
      {
        prop: 'muted',
        label: '静音播放',
        renderCell: 'switch'
      }
    ];

    styleConfigColumns = [
      {
        prop: 'height',
        label: '高度',
        renderCell: 'inputNumber'
      },
      {
        prop: 'objectFit',
        label: '显示形式',
        renderCell: {
          component: 'select',
          props: {
            options: [
              {
                label: '包含',
                value: 'contain'
              },
              {
                label: '填充',
                value: 'fill'
              },
              {
                label: '覆盖',
                value: 'cover'
              }
            ]
          }
        }
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
    ];

  }
</script>
