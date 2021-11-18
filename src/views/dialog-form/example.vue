<template>
  <bean-dialog-form
    v-model="form"
    title="弹窗example"
    :columns="columns"
    :submitHandler="submitHandler"
    @submit="handleSubmit"
    @change="handleChange"
  >
    <el-button>弹窗</el-button>
  </bean-dialog-form>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

const sleep = (time) => new Promise(resolve => setTimeout(resolve, time));

@Component
export default class Example extends Vue {

  form = {
    name: 'name'
  }

  columns = [
    {
      prop: 'name',
      label: '名字',
      renderCell: {
        required: true,
        component: 'input'
      }
    }
  ]

  handleChange(data) {
    console.log(data, 'data');
  }

  handleSubmit(data) {
    alert('handleSubmit ' + JSON.stringify(data, null, 2));
  }

  async submitHandler(data) {
    await sleep(3000);
    alert('submitHandler ' + JSON.stringify(data, null, 2));
  }

}
</script>
