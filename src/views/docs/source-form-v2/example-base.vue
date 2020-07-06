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
      field: '',
      nest: {
        field1: ''
      },
      'nest-form': []
    }

    columns = [
      {
        label: '嵌套表单',
        prop: 'nest-form',
        component: 'c-nest-form-v2',
        props: {
          columns: [
            {
              prop: 'a',
              label: 'a',
              component: 'el-input',
              required: true
            },
            {
              prop: 'b',
              label: 'b',
              component: 'el-input',
              itemProps: {
                rules: [
                  {
                    required: true,
                    message: '必填',
                    trigger: 'change'
                  }
                ]
              }
            }
          ]
        }
      },
      {
        label: '字段1',
        prop: 'field',
        component: 'el-input',
        required: true
      },
      {
        label: '嵌套字段',
        prop: 'nest.field1',
        component: 'el-input',
        itemProps: {
          rules: [
            {
              required: true,
              message: '嵌套字段是必填的',
              trigger: 'change'
            }
          ]
        },
        itemSlots: {
          header: (h, { value, form }) => <h5 h={h}>表单项headerslot, 当前值: {value}，字段1值: {form.field}</h5>,
          footer: '一段text',
        },
        props: {
          hint: '提示文案',
          placeholder: '嵌套字段placeholder'
        },
        slots: {
          suffix: (h, { value, form }) => <i h={h} class="el-input__icon el-icon-date"></i>
        },
        events: {
          input(e) {
            console.log('nest.field1 input event', e)
          },
          change(e) {
            console.log('nest.field1 change event', e)
          },
          focus(e) {
            console.log('nest.field1 focus event', e)
          }
        }
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
