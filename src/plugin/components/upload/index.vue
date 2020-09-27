<template>
  <div class="admin-upload">
    <input
      type="file"
      class="input-file"
      :ref="FILE_INPUT_REF_NAME"
      :multiple="fileInputIsMultiple"
      :accept="accept"
      @change="handleFileChange"
    />
    <el-button type="primary" icon="el-icon-upload" @click="handleUploadBtnClick" :disabled="disabled" :loading="loading">上传</el-button>
    <MultipleUpload
      v-if="renderMultipleUploadDialog && limit > 1"
      v-model="showMultipleUploadDialog"
      v-bind="{ ...$props, ...$attrs }"
      @success="$emit('success', $event)"
      @closed="handleMultipleUploadDialogClosed"
    />
    <ImageCropper
      v-model="showCroppper"
      v-bind="cropper"
      v-if="cropperImageURL"
      :loading="loading"
      :img="cropperImageURL"
      @success="handleUpload"
    />
  </div>
</template>

<script>
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import MultipleUpload from './multiple-upload';
import ImageCropper from './image-cropper';
import { uploadFile, isImageFile, imageFileNeedCrop, checkFileSize } from '../../utils';

@Component({
  components: {
    MultipleUpload,
    ImageCropper
  }
})
export default class AdminUpload extends Vue {
  @Prop(Boolean) disabled;
  @Prop({ type: Number, default: 1 }) limit;
  @Prop({ type: Object }) cropper;
  @Prop({ type: String, default: 'image/*' }) accept;
  @Prop({ type: Number, default: 3 }) size; // 单位M

  FILE_INPUT_REF_NAME = 'fileInput';

  renderMultipleUploadDialog = true;
  showMultipleUploadDialog = false;
  showCroppper = false;
  cropperImageURL = '';
  loading = false;

  get fileInputIsMultiple() {
    if (this.cropper) {
      return false;
    }
    return this.limit > 1;
  }

  handleUploadBtnClick() {
    if (this.fileInputIsMultiple) {
      this.showMultipleUploadDialog = true;
      return;
    }
    this.$refs[this.FILE_INPUT_REF_NAME].click();
  }

  async handleMultipleUploadDialogClosed() {
    this.renderMultipleUploadDialog = false;
    await this.$nextTick();
    this.renderMultipleUploadDialog = true;
  }

  @Emit('success')
  async handleUpload(blob) {
    this.loading = true;
    try {
      const res = await uploadFile(blob);
      return res;
    } finally {
      this.loading = false;
    }
  }

  async handleFileChange(e) {
    const file = e.target.files[0];
    // 相同文件change事件不会触发
    e.target.value = '';
    if (isImageFile(file) && this.cropper) {
      const needCrop = await imageFileNeedCrop(file, this.cropper);
      if (needCrop) {
        this.cropperImageURL = URL.createObjectURL(file);
        this.showCroppper = true;
        return;
      }
    }
    const sizeValid = await checkFileSize(file, this.size);
    if (!sizeValid) {
      this.$message.error(`文件大小最大: ${this.size}m`);
      return;
    }
    this.handleUpload(file);
  }
}
</script>
