<template>
  <div class="admin-source-page source-page-form">
    <div class="page-content">
      <AdminForm
        label-width="auto"
        ref="adminForm"
        v-bind="$attrs"
        v-on="$listeners"
        :columns="columns"
        :value="value"
        @change="$emit('change', $event)"
      >
        <template #action><span /></template>
      </AdminForm>
    </div>
    <div class="page-footer">
      <el-button type="primary" @click="handleSubmit" :loading="loading">提交</el-button>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Model, Prop } from 'vue-property-decorator';
import AdminForm from '../form';

@Component({
  components: {
    AdminForm
  }
})
export default class AdminSourcePageForm extends Vue {
  @Prop(Boolean) loading;
  @Prop({ type: Array, default: () => [] }) columns;
  @Model('change', { type: Object, default: () => ({}) }) value;

  handleSubmit() {
    this.$refs.adminForm.handleSubmit();
  }
}
</script>
