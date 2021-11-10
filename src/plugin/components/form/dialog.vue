<template>
  <div @click="handleShowDialog">
    <slot v-bind="{ disabled }" />
    <el-dialog
      :visible="visible"
      :title="title"
      append-to-body
      @open="handleOpenDialog"
      @close="handleCloseDialog"
    >
      <AdminForm
        v-if="renderForm"
        :columns="columns"
        :disabled="loading"
        v-bind="$attrs"
        class="admin-form-dialog"
        v-model="form"
        v-on="$listeners"
        @submit="handleSubmit"
      >
        <template v-slot:action="scope">
          <div class="box-actions">
            <el-button type="primary" @click="scope.submit" :loading="loading">{{ $t('bean.actionConfirm') }}</el-button>
            <el-button @click="handleCloseDialog">{{ $t('bean.actionCancel') }}</el-button>
          </div>
        </template>
      </AdminForm>
    </el-dialog>
  </div>
</template>

<script>
import { Vue, Component, Model, Prop, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import AdminForm from './index';

@Component({
  components: {
    AdminForm
  }
})
export default class FormDialog extends Vue {
  @Model('change', { type: Object, default: () => ({}) }) value;
  @Prop(Array) columns;
  @Prop({ type: String, default: '' }) title;
  @Prop(Function) submitHandler;
  @Prop(Boolean) resetFormOnOpenDialog;
  @Prop(Boolean) disabled;

  loading = false;
  visible = false;
  form = {};
  renderForm = true;

  handleShowDialog() {
    if (this.disabled) {
      return;
    }
    this.visible = true;
  }

  async handleOpenDialog() {
    if (this.resetFormOnOpenDialog) {
      this.renderForm = false;
      this.form = _.cloneDeep(this.value);
      await this.$nextTick();
      this.renderForm = true;
    }
  }

  handleCloseDialog() {
    this.visible = false;
  }

  async handleSubmit() {
    if (this.submitHandler) {
      this.loading = true;
      try {
        await this.submitHandler(JSON.parse(JSON.stringify(this.form)));
      } finally {
        this.loading = false;
      }
    }
    this.visible = false;
  }

  @Watch('value', { immediate: true })
  onValueChange(val) {
    this.form = _.cloneDeep(val);
  }

}
</script>
