<template>
  <div @click="handleShowDialog">
    <slot />
    <el-dialog
      v-if="render"
      :visible="visible"
      :title="title"
      append-to-body
      destroy-on-close
      @close="handleCloseDialog"
      @closed="handleDestroyDialog"
    >
      <SourceForm
        :form="dialogForm"
        :columns="columns"
        @change="handleFormChange"
        @submit="handleSubmit"
        :disabled="loading"
        v-bind="$attrs"
        class="source-form-dialog-v2"
      >
        <template v-slot:action>
          <span />
        </template>
      </SourceForm>
      <template v-slot:footer>
        <el-button type="primary" @click="handleSubmit" :loading="loading">{{ $t('确定')}}</el-button>
        <el-button @click="handleCloseDialog">{{ $t('取消') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import SourceForm from './source-form-v2';
  import { i18n } from '../i18n';

  @Component({
    components: {
      SourceForm
    }
  })
  export default class SourceFormDialog extends Vue {
    @Prop({ type: Object, default: () => ({}) }) form;
    @Prop(Array) columns;
    @Prop({ type: String, default: '' }) title;
    @Prop(Function) submitHander;

    loading = false;
    render = true;
    visible = false;
    dialogForm = {};

    handleShowDialog() {
      this.visible = true;
    }

    handleCloseDialog() {
      this.visible = false;
    }

    handleFormChange(form) {
      this.dialogForm = form;
    }

    async handleDestroyDialog() {
      this.render = false;
      await this.$nextTick();
      this.render = true;
    }

    async handleSubmit() {
      if (this.submitHander) {
        this.loading = true;
        try {
          await this.submitHander(JSON.parse(JSON.stringify(this.dialogForm)));
        } finally {
          this.loading = false;
        }
      }
      this.visible = false;
    }

    @Watch('form', { immediate: true })
    onFormChange(form) {
      if (form) {
        this.dialogForm = JSON.parse(JSON.stringify(form));
      }
    }
  }

  export const createSourceFormDialogV2 = (props) => {
    const instance = new SourceFormDialog({
      i18n,
      propsData: props
    })
    instance.$mount();
    instance.handleShowDialog();
  }
</script>
