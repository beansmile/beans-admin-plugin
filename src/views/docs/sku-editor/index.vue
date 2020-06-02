<template>
  <create-doc
    title="sku编辑"
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
        prop: 'title',
        desc: '标题',
        type: 'String',
        optionalValue: '',
        defaultValue: 'sku信息'
      },
      {
        prop: 'skuProperties',
        desc: '所有规格属性',
        type: 'Array',
        optionalValue: '',
        defaultValue: '[]'
      },
      {
        prop: 'skuColumns',
        desc: 'sku column',
        type: 'Array',
        optionalValue: '',
        defaultValue: '[]'
      },
      {
        prop: 'value/v-model',
        desc: 'sku值',
        type: 'Array',
        optionalValue: '',
        defaultValue: '[]'
      },
    ]

    events = [
      {
        name: 'change',
        desc: '更新后的sku list',
        args: 'sku'
      },
      {
        name: 'add-property',
        desc: '添加规格',
        args: 'text'
      },
      {
        name: 'add-property-value',
        desc: '添加规格值',
        args: '{ value, id }'
      },
      {
        name: 'edit-property-value',
        desc: '编辑规格值',
        args: '{ value, id, child_id }'
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
