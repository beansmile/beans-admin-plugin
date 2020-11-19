<template>
  <div class="page-editor-screen">
    <div class="preview">
      <div class="title" :style="titleStyle">
        <span>{{ $get(page, 'config.title') }}</span>
      </div>
      <div class="content">
        <div :style="[{ height: '100%', boxSizing: 'border-box', overflowY: 'auto' }, style]">
          <Preview
            :show-controller="!!activeKey"
            :pages="pages"
            :page="page"
            :active-key="activeKey"
            :all-components="components"
            v-on="$listeners"
          >
            <slot />
          </Preview>
        </div>
      </div>
    </div>

    <Controller
      :visible="!activeKey"
      :value="page.config"
      :columns="columns"
      :styleColumns="styleColumns"
      @change="handleConfigChange"
    />
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';
  import { getStyle } from './utils';
  import Controller from './controller';
  import Preview from './preview';

  @Component({
    components: {
      Controller,
      Preview
    }
  })
  export default class PageEditorScreen extends Vue {
    @Prop(Array) pages;
    @Prop(Object) page;
    @Prop(String) activeKey;
    @Prop(Array) components;

    get style() {
      return getStyle(_.get(this.page, 'config.style') || {});
    }

    get titleStyle() {
      return getStyle(_.get(this.page, 'config.style.title') || {});
    }

    columns = [
      {
        prop: 'title',
        label: '标题',
        renderCell: 'uncontrolledInput'
      },
      {
        prop: 'share.title',
        label: '分享标题',
        renderCell: 'uncontrolledInput'
      },
      {
        prop: 'share.imageUrl',
        label: '分享图片',
        renderCell: {
          component: 'upload',
          props: {
            trackedBy: 'url'
          }
        }
      },
      {
        prop: 'poster.backgroundImage',
        label: '海报图片',
        renderCell: {
          component: 'upload',
          hint: '图片宽高 300*400',
          props: {
            trackedBy: 'url',
            cropper: {
              width: 300,
              height: 400
            }
          }
        }
      },
      {
        prop: 'poster.backgroundColor',
        label: '海报背景色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      },
      {
        prop: 'poster.text',
        label: '海报文案',
        renderCell: {
          component: 'uncontrolledInput'
        }
      },
      {
        prop: 'poster.textColor',
        label: '海报文案颜色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      }
    ];

    styleColumns = [
      {
        prop: 'title.backgroundColor',
        label: '标题背景色',
         renderCell: {
          component: 'colorPicker'
        }
      },
      {
        prop: 'title.color',
        label: '标题颜色',
         renderCell: {
          component: 'select',
          props: {
            options: [
              {
                label: '白色',
                value: '#ffffff'
              },
              {
                label: '黑色',
                value: '#000000'
              }
            ]
          }
        }
      },
      {
        prop: 'backgroundColor',
        label: '背景颜色',
        renderCell: {
          component: 'colorPicker'
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

    handleConfigChange(data) {
      this.$emit('update-page', 'config', data);
    }
  }
</script>

<style lang="scss" scoped>
  .page-editor-screen,
  .preview {
    @media screen and (max-height: 850px) {
      height: 600px;
    }
    height: 767px;
    background: #fff;
  }

  .preview {
    position: relative;

    .title {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 18px;
      font-weight: bold;
      height: 54px;
      line-height: 54px;
      text-align: center;
      overflow: hidden;

      span {
        display: inline-block;
        width: 40%;
        text-align: center;
        overflow: hidden;
      }
    }

    .content {
      box-sizing: border-box;
      padding-top: 54px;
      height: 100%;
    }
  }
</style>
