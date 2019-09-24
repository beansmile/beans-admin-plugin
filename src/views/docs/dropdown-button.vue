<template>
  <create-doc
    title="下拉按钮"
    :attributes="attributes"
    :examples="examples"
  >
    <a href="https://element.eleme.cn/#/zh-CN/component/button" target="_blank">Element ui button</a>
  </create-doc>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class ClipboardDoc extends Vue {
    attributes = [
      {
        prop: 'buttons',
        desc: '渲染的按钮组',
        type: 'Array',
        optionalValue: '',
        defaultValue: '[]'
      },
      {
        prop: 'buttonProps',
        desc: 'element-ui Button 属性',
        type: 'Object',
        optionalValue: '',
        defaultValue: '{ type: "text" }) }'
      },
      {
        prop: 'buttonText',
        desc: 'button按钮组名称',
        type: 'String',
        optionalValue: '',
        defaultValue: '操作'
      },
      {
        prop: 'buttonMode',
        desc: '渲染成button，不渲染成一组下拉按钮',
        type: 'Boolean',
        optionalValue: '',
        defaultValue: 'false'
      }
    ]
    examples = [
      {
        title: '基本用法',
        code:
`<c-dropdown-button
  :buttons="[{
    title: '按钮1',
    handler: () => {}
  },
  {
    title: '按钮2',
    handler: () => {}
  }]"
/>`
      },
      {
        title: '使用buttonMode',
        code:
`<c-dropdown-button
  button-mode
  :buttons="[{
    title: '按钮1',
    handler: () => {}
  },
  {
    title: '按钮2',
    handler: () => {}
  }]"
/>`
      },
    ]
  }
</script>
