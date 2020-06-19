<template>
  <create-doc
    title="表单项"
    :attributes="attributes"
    :events="events"
    :examples="examples"
  />
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Doc extends Vue {
    attributes = [
      {
        title: 'Props',
        attributes: [
          {
            prop: 'value/v-model',
            desc: '表单项值',
            type: 'Object',
            defaultValue: '/'
          },
          {
            prop: 'column',
            desc: '表单项配置，见下面配置说明',
            type: 'Array',
            defaultValue: '[]'
          },
          {
            prop: 'row',
            desc: '当column.props是函数是，会当参数传给column.props',
            type: 'Object',
            defaultValue: '{}'
          },
          {
            prop: 'inForm',
            desc: '组件是否是el-form或者source-form子组件',
            type: 'Boolean',
            defaultValue: 'true'
          }
        ]
      },
      {
        title: 'column配置',
        attributes: [
          {
            prop: 'prop',
            desc: '字段key',
            type: 'String',
            defaultValue: '/'
          },
          {
            prop: 'label',
            desc: '字段title',
            type: 'String',
            defaultValue: '/'
          },
          {
            prop: 'form',
            desc: '表单项配置',
            type: 'Object，见column.form配置说明',
            defaultValue: '{}'
          }
        ]
      },
      {
        title: 'column.form配置',
        attributes: [
          {
            prop: 'component',
            desc: '渲染的form组件名称',
            type: 'String',
            defalutValue: ''
          },
          {
            prop: 'props',
            desc: '传给表单组件的props，如果是function，参数: (h, { data, row })',
            type: 'Object, Function',
            defalutValue: ''
          },
          {
            prop: 'required',
            desc: '是否必填',
            type: 'Boolean',
            defalutValue: 'false'
          },
          {
            prop: 'rules',
            // eslint-disable-next-line no-unused-vars
            desc(h) {
              return (
                <div>
                  校验规则-见<a href="https://element.eleme.cn/#/zh-CN/component/form" target="_blank">element-ui表单校验规则</a>
                </div>
              )
            },
            type: 'Array',
            defalutValue: '【】'
          },
          {
            prop: 'slots',
            desc: '插槽，见column.form.slots配置',
            type: 'Object',
            defalutValue: ''
          },
          {
            prop: 'className',
            desc: '表单控件自定义class',
            type: 'String',
            defalutValue: ''
          }
        ]
      },
      {
        title: 'column.form.props配置',
        attributes: [
          {
            prop: 'defaultValue',
            desc: '默认值',
            type: 'any',
            defalutValue: '/'
          },
          {
            prop: 'hint',
            desc: '表单控件说明显示在column.form.slots.footer下面',
            type: 'string',
            defalutValue: '/'
          },
          {
            prop: '其他参数',
            desc: '根据不同form.component传入各自参数',
            type: '/',
            defalutValue: '/'
          }
        ]
      },
      {
        title: 'column.form.slots配置',
        attributes: [
          {
            prop: 'header',
            desc: '表单控件上方插槽',
            type: 'vNode, Function: (h, { value })',
            defalutValue: '/'
          },
          {
            prop: 'footer',
            desc: '表单控件下方插槽',
            type: 'vNode, Function: (h, { value })',
            defalutValue: '/'
          }
        ]
      },
      {
        title: 'column.form.component可选项',
        attributes: [
          {
            prop: 'radioGroup',
            desc: '单选组'
          },
          {
            prop: 'checkboxGroup',
            desc: '复选框组'
          },
          {
            prop: 'checkboxButtonGroup',
            desc: '复选框组(按钮样式)'
          },
          {
            prop: 'input',
            desc: '输入框'
          },
          {
            prop: 'textarea',
            desc: '多行文本输入框'
          },
          {
            prop: 'inputNumber',
            desc: '数字输入框'
          },
          {
            prop: 'select',
            desc: '下拉选框'
          },
          {
            prop: 'switch',
            desc: '开关'
          },
          {
            prop: 'datePicker',
            desc: '日期选择'
          },
          {
            prop: 'dateTimePicker',
            desc: '日期时间选择'
          },
          {
            prop: 'timePicker',
            desc: '时间选择'
          },
          {
            prop: 'colorPicker',
            desc: '颜色选择'
          },
          {
            prop: 'upload',
            desc: '上传'
          },
          {
            prop: 'editor',
            desc: '富文本编辑器'
          },
          {
            prop: 'nestForm',
            desc: '嵌套表单'
          },
          {
            prop: 'staticNestForm',
            desc: 'staticNestForm'
          },
          {
            prop: 'vNode',
            desc: '自定义vNode'
          },
          {
            prop: 'listSelect',
            desc: '列表选择器'
          },
          {
            prop: 'cascader',
            desc: '级联选择器'
          },
        ]
      }
    ]

    events = [
      {
        name: 'change',
        desc: '值发生变化时触发',
        args: 'change后的值'
      },
    ]

    examples = [
      {
        title: '用法',
        code: require('!raw-loader!./example.vue').default,
        example: h => {
          const Example = require('./example.vue').default;
          return <Example h={h} />
        }
      }
    ]

  }
</script>
