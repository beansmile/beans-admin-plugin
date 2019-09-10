<template>
  <el-form
    class="c-source-form"
    label-position="left"
    label-width="auto"
    v-loading="loading || loadingService.state.count > 0"
    :model="formData"
    ref="source-form"
  >
    <div class="content">
      <slot name="header" />
      <c-source-form-item
        v-for="column in editColumns"
        :key="column.prop"
        :column="column"
        :row="data"
        v-model="formData"
        @change="handleChange"
      />
      <slot />
    </div>
    <el-form-item class="btn-group">
      <el-button type="primary" @click="onSubmit('source-form')">确定</el-button>
      <el-button @click="$emit('cancel')" v-if="showCancelButton">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
import _ from 'lodash';
import { loadingService } from '../services';
import { createDialog } from '../utils';

@Component
export default class SourceForm extends Vue {
  @Prop({ type: Array, default: () => [] }) columns;
  @Prop({ type: Object, default: () => ({}) }) data;
  @Prop({ type: Boolean, default: false }) showCancelButton;

  loadingService = loadingService;

  loading = false;
  formData = {};

  get editColumns() {
    return this.columns.filter(item => _.get(item, 'form.component'));
  }

  @Emit('submit')
  async onSubmit(formName) {
    await this.$refs[formName].validate();
    return JSON.parse(JSON.stringify(this.formData));
  }

  @Emit('change')
  handleChange(data) {
    return data;
  }

  @Watch('data', { immediate: true })
  onDataChange(val) {
    if (val) {
      this.formData = _.pick(this.data, this.editColumns.map(column => column.prop));
    }
  }
}

export const createSourceFormDialog = (h, {
  title = '弹窗',
  columns = [],
  data = {},
  onConfirm,
  onChange = _.noop,
  onClose,
  ...opts
} = {}) => {
  const sourceFormComponent = <SourceForm showCancelButton columns={columns} data={data} />;
  const slots = {
    default: sourceFormComponent
  }
  const props = { title, top: '0', ...opts, customClass: `source-form-dialog ${opts.customClass || ''}` }

  const events = {
    close: (instance) => {
      instance.visible = false;
      onClose && onClose();
    },
    opened: (instance) => {
      const { componentInstance } = sourceFormComponent;
      componentInstance.$on('cancel', () => {
        instance.visible = false;
        onClose && onClose();
      });
      componentInstance.$on('change', onChange);
      componentInstance.$on('submit', async(data) => {
        if (onConfirm) {
          componentInstance.loading = true;
          try {
            await onConfirm(data);
          } finally {
            componentInstance.loading = false;
          }
        }
        instance.visible = false;
      });
    }
  }
  return createDialog({
    slots,
    props,
    events
  });
}
</script>
