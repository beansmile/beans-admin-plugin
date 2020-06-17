<template>
  <c-source-form
    :columns="columns"
    :data="data"
    @change="handleChange"
    @submit="handleSubmit"
  />
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example extends Vue {
    data = {
      field1: 'test'
    }

    columns = [
      {
        prop: 'field1',
        label: '字段1',
        form: {
          component: 'input'
        }
      },
      {
        prop: 'field2',
        label: '字段2',
        form: {
          component: 'inputNumber'
        }
      },
      {
        prop: 'field3',
        label: 'vNode',
        form: {
          component: 'vNode',
          props: {
            // eslint-disable-next-line no-unused-vars
            renderNode: h => <input onInput={this.handleCustomFormInputChange} />
          }
        }
      }
    ]

    handleCustomFormInputChange(e) {
      console.log(e)
    }

    handleChange(data) {
      console.log(data, 'change')
    }

    handleSubmit(form) {
      console.log(form, 'form')
    }
  }
</script>
