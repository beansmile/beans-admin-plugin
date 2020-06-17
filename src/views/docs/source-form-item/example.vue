<template>
  <div>
    <h3>非表单中使用</h3>
    <c-source-form-item
      v-model="data"
      :row="row"
      :column="column"
      :in-form="false"
      @change="handleChange"
    />
    <br>
    <h3>表单中使用</h3>
    <c-source-form>
      <c-source-form-item
        v-model="data"
        :row="row"
        :column="column"
        @change="handleChange"
      />
    </c-source-form>
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example extends Vue {
    data = {
      field1: 'test'
    }

    row = {
      placeholder: 'placeholder'
    }

    column = {
      prop: 'field1',
      label: '字段1',
      form: {
        component: 'input',
        props(h, { data, row }) {
          console.log(data, row)
          return {
            placeholder: row.placeholder
          }
        }
      }
    }

    handleChange(data) {
      console.log(data, 'change')
    }
  }
</script>
