<template>
  <div @click="handleShowDialog">
    <slot />
    <el-dialog
      :visible="visible"
      :title="title"
      append-to-body
      @close="handleCloseDialog"
    >
      <AdminForm
        :value="value"
        :columns="columns"
        :disabled="loading"
        v-bind="$attrs"
        class="admin-form-dialog"
        @submit="handleSubmit"
        @change="$emit('change', $event)"
      >
        <template v-slot:action="scope">
          <div class="box-actions">
            <el-button type="primary" @click="scope.submit" :loading="loading">确定</el-button>
            <el-button @click="handleCloseDialog">取消</el-button>
          </div>
        </template>
      </AdminForm>
    </el-dialog>
  </div>
</template>

<script>
import { Vue, Component, Model, Prop } from 'vue-property-decorator';
import AdminForm from './index';

@Component({
  components: {
    AdminForm
  }
})
export default class FormDialog extends Vue {
  @Model('change', { type: Object, default: () => ({}) }) value;
  @Prop(Array) columns;
  @Prop({ type: String, default: '弹窗' }) title;
  @Prop(Function) onSubmit;

  loading = false;
  visible = false;

  handleShowDialog() {
    this.visible = true;
  }

  handleCloseDialog() {
    this.visible = false;
  }

  async handleSubmit() {
    if (this.onSubmit) {
      this.loading = true;
      try {
        await this.onSubmit(JSON.parse(JSON.stringify(this.value)));
      } finally {
        this.loading = false;
      }
    }
    this.visible = false;
  }
}
</script>
