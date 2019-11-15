<template>
  <el-form
    label-position="left"
    label-width="auto"
  >
    <c-static-nest-form
      v-model="formModel"
      :columns="columns"
    />

    <c-static-nest-form
      v-model="formModel"
      :columns="collapsibleColumns"
      :collapsible="true"
    />
    <el-button type="primary" @click="handleSubmit" style="margin-top: 20px;">提交</el-button>
  </el-form>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example extends Vue {
    formModel = {
      input: '输入框值',
      collapsibleInput: '折叠式输入框值'
    }

    columns = [
      {
        prop: 'input',
        label: '输入框',
        form: {
          component: 'input'
        }
      }
    ]

    collapsibleColumns = [
      {
        prop: 'collapsibleInput',
        label: '折叠式输入框',
        form: {
          component: 'input'
        }
      }
    ]

    handleSubmit() {
      console.log(this.formModel);
    }
  }
</script>
