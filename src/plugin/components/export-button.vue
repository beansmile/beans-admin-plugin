<template>
  <el-button :loading="loading" @click="handleExport" type="primary">{{ buttonTextI18n }}</el-button>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';
  import contentDisposition from 'content-disposition';
  import { fly } from '../utils';

  @Component
  export default class ExportButton extends Vue {
    @Prop({ type: String }) buttonText;
    @Prop(String) url;
    @Prop(Object) params;
    @Prop(String) fileName;
    @Prop(Function) beforeExport;
    @Prop(Function) requestDownload;

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

    getAttachmentNameFromHeader(header) {
      const cd = header['content-disposition'] || header['Content-Disposition'];
      if (cd) {
        try {
          const result = contentDisposition.parse(cd);
          return _.get(result, 'parameters.filename');
        } catch (e) {
          return '';
        }
      }
      return '';
    }

    async download({
      url,
      params,
      name
    } = {}) {
      let result;
      if (_.isFunction(this.requestDownload)) {
        result = await this.requestDownload({ url, params });
      } else {
        result = await fly.get(url, params, { responseType: 'blob', return_res: true, timeout: 5 * 60 * 1000 });
      }
      const isFullResponse = _.isPlainObject(result);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      const blob = new Blob([isFullResponse ? result.data : result]);
      a.href = window.URL.createObjectURL(blob);
      a.download = name || (isFullResponse ? this.getAttachmentNameFromHeader(result.headers) : '') || 'file';
      a.click();
      document.body.removeChild(a);
    }
  }
</script>
