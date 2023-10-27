<template>
  <div
    class="admin-dropbox"
    :class="{ active, disabled: disabled }"
    @dragenter.stop.prevent="handleDropEnter"
    @dragover.stop.prevent="handleDropEnter"
    @dragleave.stop.prevent="handleDropLeave"
    @drop.stop.prevent="handleDropFile"
    @click.stop="handleClick"
    v-loading="loading"
  >
    <i class="el-icon-upload" />
    <div class="upload-text">将文件拖到此处，或点击上传</div>

    <input
      :accept="accept"
      type="file"
      style="position: fixed; left: -200%; width: 0; height: 0;"
      ref="input"
      :multiple="limit > 1"
      @change="handleFileInputChange"
      @click.stop
    />
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { i18n } from '../i18n';

@Component
export default class DropBox extends Vue {
  @Prop(String) accept;
  @Prop(Boolean) disabled;
  @Prop(Boolean) loading;
  @Prop({ type: Number, default: 0 }) size; // 单位M 0表示不限制
  @Prop({ type: Number, default: 1 }) limit;
  
  active = false;

  checkFileType(file, accept) {
    if (!accept || accept === '*') {
      return true;
    }
    const valid = accept.replace(/\s/g, '').split(',').filter(accept => {
      if (accept.startsWith('.')) {
        return (file.name || '').toLowerCase().endsWith(accept.toLowerCase());
      }
      return new RegExp(accept.replace('*', '.*')).test(file.type);
    }).length > 0;
    return valid;
  }


  handleDropEnter() {
    this.active = true;
  }

  handleDropLeave() {
    this.active = false;
  }

  validateFile(file, { validateType = true, validateSize = true } = {}) {
    if (validateType) {
      const fileTypeValid = this.checkFileType(file, this.accept);
      if (!fileTypeValid) {
        return `${file.name} - 格式不对`;
      }
    }
    if (validateSize && this.size > 0) {
      if (file.size > this.size * 1024 * 1024) {
        return `${file.name} - 最大${this.size}M`;
      }
    }
    return null;
  }

  handleFiles(files, { validateType = true, validateSize = true } = {}) {
    if (files.length) {
      if (files.length > this.limit) {
        this.$emit('error', `最多可选择 ${this.limit}个文件`);
        return;
      }
      if (this.limit === 1) {
        const errMsg = this.validateFile(files[0], { validateType, validateSize });
        if (errMsg) {
          this.$emit('error', errMsg);
          return;
        }
        this.$emit('change', files);
      } else {
        const validFiles = files.filter(item => !this.validateFile(item, { validateType, validateSize }));
        if (validFiles.length !== files.length) {
          this.$emit('error', i18n.t('已过滤不符合要求的文件'));
        }
        if (validFiles.length) {
          this.$emit('change', validFiles);
        }
      }
    }
  }

  handleDropFile(e) {
    this.handleDropLeave();
    this.handleFiles([...e.dataTransfer.files]);
  }

  handleFileInputChange(e) {
    const files = e.target.files;
    this.handleFiles([...files], { validateType: false });
    // 相同文件change事件不会触发
    e.target.value = '';
  }

  handleClick() {
    this.$refs.input.click();
  }
}
</script>
