<template>
  <div>
    <bean-form
      :columns="columns"
      v-model="form"
      @submit="handleSubmit"
    />
    <hr>
    <bean-form
      :columns="columns"
      v-model="form2"
      @submit="handleSubmit2"
    >
      <template #header>
        <div>表单header</div>
      </template>
      <template #action="{ submit, clear, reset }">
        <el-button @click="submit" type="danger">保存</el-button>
        <el-button @click="clear" type="warning">清空</el-button>
        <el-button @click="reset" type="info">重置</el-button>
      </template>
    </bean-form>
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Example extends Vue {

  form = {};

  form2 = {
    title: '默认标题'
  };

  columns = [
    {
      prop: 'title',
      label: '标题',
      renderCell: {
        required: true,
        component: 'input'
      }
    },
    {
      prop: 'number',
      label: '数字',
      renderCell: {
        required: true,
        component: 'input',
        hint: '请输入数字',
        attrs: {
          placeholder: '请输入数字'
        },
        rules: [
          {
            type: 'string',
            pattern: /^\d+$/,
            message: '请输入数字'
          }
        ]
      }
    }
  ];

  handleSubmit(data) {
    alert(JSON.stringify(data, null, 2));
  }

  handleSubmit2(data) {
    alert(JSON.stringify(data, null, 2));
  }

}
</script>
