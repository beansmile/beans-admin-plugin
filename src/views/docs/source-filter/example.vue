<template>
  <c-source-filter
    :filter="filter"
  />
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example extends Vue {
    filter = [
      {
        prop: 'search1',
        label: '搜索1',
        form: {
          component: 'search'
        }
      },
      {
        prop: 'search2',
        label: '搜索2',
        form: {
          component: 'search'
        }
      },
      {
        prop: 'field1',
        label: '字段1',
        form: {
          component: 'input'
        }
      }
    ]
  }
</script>
