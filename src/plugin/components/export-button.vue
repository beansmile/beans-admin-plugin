<template>
  <el-button :loading="loading" @click="handleExport" type="primary">{{ buttonTextI18n }}</el-button>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';
  import { fly } from '../utils';

  @Component
  export default class ExportButton extends Vue {
    @Prop({ type: String }) buttonText;
    @Prop(String) url;
    @Prop(Object) params;
    @Prop({ type: String, default: 'resource.xlsx' }) fileName;
    @Prop(Function) beforeExport;

    loading = false;

    get buttonTextI18n() {
      return this.buttonText || this.$t('bean.actionExport');
    }

    async handleExport() {
      this.loading = true;
      try {
        const body = {
          url: this.url,
          name: this.fileName,
          params: this.params
        }
        if (_.isFunction(this.beforeExport)) {
          const downloadBody = await this.beforeExport(body);
          await this.download(downloadBody || body);
        } else {
          await this.download(body);
        }
      } finally {
        this.loading = false;
      }
    }

    async download({
      url,
      params,
      name = 'resource.xlsx'
    } = {}) {
      const result = await fly.get(url, params, { responseType: 'blob', timeout: 5 * 60 * 1000 });
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      const blob = new Blob([result]);
      a.href = window.URL.createObjectURL(blob);
      a.download = name;
      a.click();
      document.body.removeChild(a);
    }
  }
</script>
