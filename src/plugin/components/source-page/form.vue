<template>
  <div class="admin-source-page source-page-form">
    <div class="page-content">
      <AdminForm
        ref="adminForm"
        v-bind="renderProps"
        v-on="$listeners"
        :columns="columns"
        :value="value"
        @change="$emit('change', $event)"
      >
        <template #action><span /></template>
      </AdminForm>
    </div>
    <div class="page-footer">
      <el-button type="primary" @click="handleSubmit" :loading="loading">{{ $t('bean.actionSubmit') }}</el-button>
      <slot name="action" :value="value" />
    </div>
  </div>
</template>

<script>
import { Vue, Component, Model, Prop } from 'vue-property-decorator';
import { screenService } from '../../services';
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

  get renderProps() {
    const isMobile = screenService.isXs || screenService.isSm;
    return {
      ...(isMobile ? { 'label-position': 'top' } : { 'label-position': 'left', 'label-width': 'auto' }),
      ...this.$attrs
    };
  }

  handleSubmit() {
    this.$refs.adminForm.handleSubmit();
  }
}
</script>
