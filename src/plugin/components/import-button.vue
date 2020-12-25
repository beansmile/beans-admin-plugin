<template>
  <div class="admin-import-block">
    <el-tooltip :disabled="!excelTemplateDownloadLink" placement="top" effect="light">
      <a slot="content" :href="encodeURI(excelTemplateDownloadLink)" style="text-decoration: underline;">
        {{ tooltipText || '下载模板' }}
      </a>
      <div class="import-btn">
        <el-button type="primary" :loading="importing">{{ buttonText }}</el-button>
        <input type="file" :accept="fileAccept" :disabled="importing" @change="handleFileChange" />
      </div>
    </el-tooltip>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';
  import { Message } from 'element-ui';

  @Component
  export default class ExportButton extends Vue {
    @Prop({ type: String }) buttonText;
    @Prop(String) excelTemplateDownloadLink;
    @Prop(String) tooltipText;
    @Prop(Function) fileChangeHandler;
    @Prop(String) url; // 导入接口路径
    @Prop({ type: String, default: '.xlsx' }) fileAccept;
    @Prop(String) loadingToast;

    importing = false;

    async handleFileChange(e) {
      if (_.isFunction(this.fileChangeHandler)) {
        await this.fileChangeHandler(e);
      } else {
        this.xlsxFile = e.target.files[0];
        if (this.xlsxFile) {
          this.importing = true;
          let toastInstance = null;
          if (this.loadingToast) {
            toastInstance = Message.info({
              message: this.loadingToast,
              duration: 0,
              showClose: true
            });
          }
          try {
            let form = new FormData();
            form.append('file_message', this.xlsxFile);
            const requestConfig = {
              headers: { 'Content-Type': 'multipart/form-data' },
              responseType: 'blob',
              return_res: true,
              // 1小时超时
              timeout: 1 * 60 * 60 * 1000
            }
            await this.$request.post(this.url, form, requestConfig).then(
              (result) => {
                if (result.headers['x-error-message']) {
                  this.$message.error(decodeURI(result.headers['x-error-message']));
                } else if (+result.headers['x-error-count'] > 0) {
                  const a = document.createElement('a');
                  document.body.appendChild(a);
                  a.style = 'display: none';
                  a.href = window.URL.createObjectURL(new Blob([result.data]));
                  a.download = `${this.$t('bean.error_massage')}.xlsx`;
                  a.click();
                  document.body.removeChild(a);
                  this.$message.error(this.$t('bean.importFail'));
                } else {
                  this.$message.success(this.$t('bean.importSuccess'));
                }
              }
            );
          } finally {
            this.importing = false;
            if (toastInstance) {
              toastInstance.close();
            }
          }
        }
      }
      e.target.value = '';
    }
  }
</script>
