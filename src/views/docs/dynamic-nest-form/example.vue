<template>
  <el-form>
    <c-nest-form
      v-model="formModel"
      :columns="columns"
    />
    <el-button type="primary" @click="handleSubmit" style="margin-top: 20px">提交</el-button>
  </el-form>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example extends Vue {
    formModel = [
      {
        input: '输入框值'
      }
    ]
    columns = [
      {
        prop: 'input',
        label: '输入框',
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
