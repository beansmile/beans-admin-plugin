<template>
  <create-doc
    title="表单v2"
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
            prop: 'columns',
            desc: '表单项配置，件下文column配置',
            type: 'Array',
            defaultValue: '[]'
          },
          {
            prop: 'form/v-model',
            desc: '表单值',
            type: 'Object',
            defaultValue: '{}'
          }
        ]
      },
      {
        title: 'column配置',
        attributes: [
          {
            prop: 'label',
            desc: '表单项标题',
            type: 'String',
            defaultValue: ''
          },
          {
            prop: 'prop',
            desc: '表单项字段key，可以嵌套 attr.a.b',
            type: 'String',
            defaultValue: ''
          },
          {
            prop: 'component',
            desc: '表单项使用的表单组件，可以使用任何组件，不限于表单组件，如模板语法<el-input />，填组件名称el-input，模板语法<input />，填input',
            type: 'String|Object',
            defaultValue: ''
          },
          {
            prop: 'itemProps',
            desc: 'el-form-item组件props，见https://element.eleme.cn/#/zh-CN/component/form',
            type: 'Object',
            defaultValue: '{}'
          },
          {
            prop: 'itemSlot',
            desc: '表单项slot，见下面例子',
            type: 'String,VNode',
            defaultValue: '{}'
          },
          {
            prop: 'slot',
            desc: '表单组件slot，表单组件slot都可以配置，见下面例子',
            type: 'Object<String,VNode>',
            defaultValue: '{}'
          },
          {
            prop: 'props',
            desc: '表单组件prop，表单组件所有可配置属性，见下面例子',
            type: 'Object<any>',
            defaultValue: '{}'
          },
          {
            prop: 'events',
            desc: '表单组件event，表单组件所有事件，见下面例子',
            type: 'Object<any>',
            defaultValue: '{}'
          },
        ]
      }
    ]

    events = [
      {
        name: 'change',
        desc: '表单发生变化时触发',
        args: 'change后的值'
      },
      {
        name: 'submit',
        desc: '表单提交时触发',
        args: '表单当前值'
      }
    ]

    examples = [
      {
        title: '基本用法',
        code: require('!raw-loader!./example-base.vue').default,
        example: h => {
          const Example = require('./example-base.vue').default;
          return <Example h={h} />
        }
      },
      {
        title: '分组表单',
        code: require('!raw-loader!./example-form-group.vue').default,
        example: h => {
          const Example = require('./example-form-group.vue').default;
          return <Example h={h} />
        }
      }
    ]

  }
</script>
