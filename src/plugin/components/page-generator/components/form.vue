<template>
  <div class="page-editor-form">
    <div class="preview" :style="getStyle('container')">
      <div class="item">
        <!-- <label>姓名</label> -->
        <input type="text" placeholder="请输入姓名" :style="getStyle('input')">
      </div>
      <div class="item">
        <!-- <label>联系电话</label> -->
        <input type="text" placeholder="请输入联系电话" :style="getStyle('input')">
      </div>
      <div class="item">
        <!-- <label>邮箱地址</label> -->
        <input type="text" placeholder="请输入邮箱地址" :style="getStyle('input')">
      </div>
      <div class="item">
        <!-- <label>内容</label> -->
        <textarea type="text" placeholder="请输入内容" :style="getStyle('input')"></textarea>
      </div>

      <button :style="getStyle('button')">提交</button>
    </div>
    <Controller
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
      container: {
        backgroundColor: '#fff',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
      },
      input: {
        color: '#000',
        borderColor: '#eee',
        borderRadius: 4,
        fontSize: 14
      },
      button: {
        color: '#fff',
        backgroundColor: '#399e63',
        fontSize: 16,
        borderRadius: 4
      }
    }
  }

  @Component({
    components: {
      Controller
    }
  })
  export default class PageEditorForm extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: Array, default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    baseConfigColumns = []

    styleConfigColumns = [
      {
        prop: 'title',
        label: '',
        renderCell: {
          component: 'title',
          props: {
            text: '设置'
          }
        }
      },
      {
        prop: 'container.backgroundColor',
        label: '背景色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
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
      },

      {
        prop: 'input.color',
        label: '输入字体颜色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      },
      {
        prop: 'input.borderColor',
        label: '边框色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      },
      {
        prop: 'input.borderRadius',
        label: '输入框圆角',
        renderCell: {
          component: 'inputNumber'
        }
      },
      {
        prop: 'input.fontSize',
        label: '字体大小',
        renderCell: {
          component: 'inputNumber'
        }
      },

      {
        prop: 'button.color',
        label: '按钮字体颜色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      },
      {
        prop: 'button.backgroundColor',
        label: '按钮背景色',
        renderCell: {
          component: 'colorPicker',
          props: {
            'show-alpha': true
          }
        }
      },
      {
        prop: 'button.fontSize',
        label: '按钮字体大小',
        renderCell: {
          component: 'inputNumber'
        }
      },
      {
        prop: 'button.borderRadius',
        label: '按钮圆角',
        renderCell: {
          component: 'inputNumber'
        }
      }
    ]

    getStyle(key) {
      return getStyle(_.get(this, `value.style.${key}`) || {});
    }
  }
</script>

<style lang="scss" scoped>
  .preview {
    .item {
      display: flex;
      flex-direction: column;
      margin-bottom: 15px;

      label  {
        font-size: 14px;
        margin-bottom: 5px;
      }

      input {
        box-sizing: border-box;
        height: 40px;
      }

      input, textarea {
        border: 1px solid;
        outline: none;
      }

      textarea {
        height: 150px;
        resize: none;
      }
    }

    button {
      width: 100%;
      border: none;
      padding: 5px 10px;
    }
  }
</style>
