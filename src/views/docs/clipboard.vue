<template>
  <create-doc
    title="复制到剪切板"
    :attributes="attributes"
    :examples="examples"
  />
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Doc extends Vue {
    attributes = [
      {
        prop: 'text',
        desc: '需要复制到剪贴板的内容，无则取textContent',
        type: 'String',
        optionalValue: '',
        defaultValue: 'HTMLElement.textContent'
      }
    ]
    examples = [
      {
        title: '不传text',
        code: '<c-clipboard>复制到剪切板</c-clipboard>'
      },
      {
        title: '传text',
        code: '<c-clipboard text="测试复制到剪切板">复制到剪切板</c-clipboard>'
      }
    ]
  }
</script>
