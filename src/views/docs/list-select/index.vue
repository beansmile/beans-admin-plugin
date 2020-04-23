<template>
  <create-doc
    title="list-select"
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
        prop: 'value/v-model',
        desc: '组件当前值',
        type: 'Array',
        optionalValue: '',
        defaultValue: '[]'
      },
      {
        prop: 'trackBy',
        desc: '对比数组中Object是否已选择',
        type: 'String',
        optionalValue: '',
        defaultValue: 'id'
      },
      {
        prop: 'label',
        desc: '数组中Object渲染名字的key',
        type: 'String',
        optionalValue: '',
        defaultValue: 'label'
      },
      {
        prop: 'sort',
        desc: '支持拖拽排序',
        type: 'Boolean',
        optionalValue: '',
        defaultValue: 'true'
      },
      {
        prop: 'renderLabel',
        desc: '自定义渲染label',
        type: 'Function',
        optionalValue: '',
        defaultValue: '(h, { item, index, panel }) => item.label'
      },
      {
        prop: 'filterColumns',
        desc: '筛选数据的filter columns和source-page filter用法一致',
        type: 'Array',
        optionalValue: '',
        defaultValue: '[]'
      },
      {
        prop: 'onFilter',
        desc: '筛选时触发的函数',
        type: 'Function',
        optionalValue: '',
        defaultValue: ''
      },
      {
        prop: 'onLoad',
        desc: '组件mounted触发的函数(用来初始化列表)',
        type: 'Function',
        optionalValue: '',
        defaultValue: ''
      }
    ]

    events = [
      {
        name: 'change',
        desc: '组件值发生变化时触发',
        args: 'change后的值'
      }
    ]

    examples = [
      {
        title: '基本用法',
        code: require('!raw-loader!./example.vue').default,
        example: h => {
          const Example = require('./example.vue').default;
          return <Example h={h} />
        }
      }
    ]
  }
</script>
