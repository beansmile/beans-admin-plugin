<template>
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
</template>

<script>
import { Vue, Component, Prop, InjectReactive } from 'vue-property-decorator';
import _ from 'lodash';
import Controller from '../controller';
import { getStyle } from '../helper';

@Component
export default class PageCreatorVideo extends Vue {
  @Prop(Object) value;
  @InjectReactive() pageWidth;

  static defaultValue = {
    controls: true,
    style: {
      height: 210,
      objectFit: 'contain'
    }
  }

  static Controller = {
    functional: true,
    render(h, context) {
      const { parent } = context;
      const configColumns = [
        {
          prop: 'video',
          label: parent.$t('bean.pageGenerator.uploadVideo'),
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
          label: parent.$t('bean.pageGenerator.videoPoster'),
          renderCell: {
            component: 'upload',
            props: {
              trackedBy: 'url'
            }
          }
        },
        {
          prop: 'controls',
          label: parent.$t('bean.pageGenerator.videoShowControls'),
          renderCell: 'switch'
        },
        {
          prop: 'autoplay',
          label: parent.$t('bean.pageGenerator.videoAutoplay'),
          renderCell: 'switch'
        },
        {
          prop: 'loop',
          label: parent.$t('bean.pageGenerator.videoLoop'),
          renderCell: 'switch'
        },
        {
          prop: 'muted',
          label: parent.$t('bean.pageGenerator.uploadVideo'),
          renderCell: 'switch'
        }
      ];
      const styleColumns = [
        {
          prop: 'height',
          label: parent.$t('bean.pageGenerator.height'),
          renderCell: 'inputNumber'
        },
        {
          prop: 'objectFit',
          label: parent.$t('bean.pageGenerator.objectFit'),
          renderCell: {
            component: 'select',
            props: {
              options: [
                {
                  label: parent.$t('bean.pageGenerator.contain'),
                  value: 'contain'
                },
                {
                  label: parent.$t('bean.pageGenerator.fill'),
                  value: 'fill'
                },
                {
                  label: parent.$t('bean.pageGenerator.cover'),
                  value: 'cover'
                }
              ]
            }
          }
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
          animation
        />
      );
    }
  }

  get style() {
    return {
      width: '100%',
      boxSizing: 'border-box',
      ...getStyle(_.get(this, 'value.style') || {}, this.pageWidth)
    };
  }
}
</script>
