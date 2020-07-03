<template>
  <c-source-form-v2
    :columns="columns"
    v-model="form"
    @change="handleFormChange"
    @submit="handleFormSubmit"
  />
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';
  /* eslint-disable no-unused-vars */

  @Component
  export default class FormExample extends Vue {
    form = {
      group1: {
        field: ''
      },
      group2: {
        field: ''
      }
    }

    columns = [
      {
        title: '分组1',
        columns: [
          {
            label: '分组1input',
            prop: 'group1.field',
            component: 'el-input',
            required: true
          }
        ]
      },
      {
        title: '分组2',
        columns: [
          {
            label: '分组2input',
            prop: 'group2.field',
            component: 'el-input',
            required: true
          }
        ]
      }
    ]

    handleFormChange(form) {
      console.log(form, 'handleFormChange')
    }

    handleFormSubmit(form) {
      console.log(form, 'handleFormSubmit')
    }
  }
</script>
