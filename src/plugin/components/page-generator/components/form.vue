<template>
  <div class="page-editor-form">
    <Animation :type="$get(value, 'animation.type', '')">
      <div class="preview" :style="getStyle('container')">
        <div class="item">
          <!-- <label>姓名</label> -->
          <input type="text" :placeholder="$t('bean.pageGenerator.formInputPlaceHolder')" :style="getStyle('input')">
        </div>
        <div class="item">
          <!-- <label>联系电话</label> -->
          <input type="text" :placeholder="$t('bean.pageGenerator.formTelPlaceHolder')" :style="getStyle('input')">
        </div>
        <div class="item">
          <!-- <label>邮箱地址</label> -->
          <input type="text" :placeholder="$t('bean.pageGenerator.formEmailPlaceHolder')" :style="getStyle('input')">
        </div>
        <div class="item">
          <!-- <label>内容</label> -->
          <textarea type="text" :placeholder="$t('bean.pageGenerator.formContentPlaceHolder')" :style="getStyle('input')"></textarea>
        </div>

        <button :style="getStyle('button')">{{ $t('bean.actionSubmit') }}</button>
      </div>
    </Animation>
    <Controller
      animation
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
      Controller,
      Animation
    }
  })
  export default class PageEditorForm extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: [Array, Function], default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    baseConfigColumns = []

    get styleConfigColumns() {
      return [
        {
          prop: 'title',
          label: '',
          renderCell: {
            component: 'title',
            props: {
              text: this.$t('bean.pageGenerator.setting')
            }
          }
        },
        {
          prop: 'container.backgroundColor',
          label: this.$t('bean.pageGenerator.backgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
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
        },

        {
          prop: 'input.color',
          label: this.$t('bean.pageGenerator.inputFontColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'input.borderColor',
          label: this.$t('bean.pageGenerator.borderColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'input.borderRadius',
          label: this.$t('bean.pageGenerator.inputBorderRadius'),
          renderCell: {
            component: 'inputNumber'
          }
        },
        {
          prop: 'input.fontSize',
          label: this.$t('bean.pageGenerator.fontSize'),
          renderCell: {
            component: 'inputNumber'
          }
        },

        {
          prop: 'button.color',
          label: this.$t('bean.pageGenerator.buttonFontColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'button.backgroundColor',
          label: this.$t('bean.pageGenerator.buttonBackgroundColor'),
          renderCell: {
            component: 'colorPicker',
            props: {
              'show-alpha': true
            }
          }
        },
        {
          prop: 'button.fontSize',
          label: this.$t('bean.pageGenerator.buttonFontSize'),
          renderCell: {
            component: 'inputNumber'
          }
        },
        {
          prop: 'button.borderRadius',
          label: this.$t('bean.pageGenerator.buttonBorderRadius'),
          renderCell: {
            component: 'inputNumber'
          }
        }
      ]
    }

    getStyle(key) {
      return getStyle(_.get(this, `value.style.${key}`) || {});
    }
  }
</script>
