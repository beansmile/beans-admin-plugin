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
  import { uploadFile } from '../utils/upload';

  @Component
  export default class ImportButton extends Vue {
    @Prop({ type: String }) buttonText;
    @Prop(String) excelTemplateDownloadLink;
    @Prop(String) tooltipText;
    @Prop(Function) fileChangeHandler;
    @Prop(String) url; // 导入接口路径
    @Prop({ type: String, default: '.xlsx' }) fileAccept;
    @Prop(String) loadingToast;
    @Prop(Function) customUpload;
    @Prop({ type: Boolean, default: false }) useGlobalUpload; // 使用全局的upload
    @Prop({ type: Object }) globalUploadProps;
    @Prop({ type: String, default: 'file_message' }) fileName
    @Prop(Function) onUploadError // 自定义错误方法

    importing = false;

    download(blob, fileName) {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = window.URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
      document.body.removeChild(a);
    }

    async upload(file) {
      const form = new FormData();
      form.append(this.fileName, file);
      const requestConfig = {
        headers: { 'Content-Type': 'multipart/form-data' },
        responseType: 'blob',
        return_res: true,
        // 1小时超时
        timeout: 1 * 60 * 60 * 1000
      }
      const result = await this.$request.post(this.url, form, requestConfig);
      if (result.headers['x-error-message']) {
        throw new Error(decodeURI(result.headers['x-error-message']));
      }
      if (+result.headers['x-error-count'] > 0) {
        this.download(new Blob([result.data]), `${this.$t('bean.error_massage')}.xlsx`);
        throw new Error(this.$t('bean.importFail'));
      }
    }

    async handleFileChange(e) {
      if (_.isFunction(this.fileChangeHandler)) {
        this.fileChangeHandler(e);
        return;
      }
      const file = e.target.files[0];
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
        if (_.isFunction(this.customUpload)) {
          await this.customUpload(file);
        } else if (this.useGlobalUpload) {
          await uploadFile(file, this.globalUploadProps);
        } else {
          await this.upload(file);
        }
        this.$message.success(this.$t('bean.importSuccess'));
      } catch (e) {
        if (this.onUploadError) {
          this.onUploadError(e);
        } else {
          const msg = e.message || this.$t('bean.importFail');
          this.$message.error(msg);
        }
      } finally {
        this.importing = false;
        if (toastInstance) {
          toastInstance.close();
        }
      }
      e.target.value = '';
    }
  }
</script>
