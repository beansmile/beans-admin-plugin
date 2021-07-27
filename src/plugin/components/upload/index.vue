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
    <el-button
      type="primary"
      icon="el-icon-upload"
      @click="handleUploadBtnClick"
      :disabled="disabled"
      :loading="loading"
    >
      {{ uploadButtonTextI18n }}
      <template v-if="loading">
        ({{ uploadProgressPct }}%)
      </template>
    </el-button>
    <MultipleUpload
      v-if="renderMultipleUploadDialog && limit > 1"
      v-model="showMultipleUploadDialog"
      v-bind="{ limit, cropper, accept, size, ...$attrs }"
      @success="$emit('success', $event)"
      @closed="handleMultipleUploadDialogClosed"
    />
    <ImageCropper
      v-model="showCroppper"
      v-bind="cropper"
      v-if="cropperImageURL"
      :loading="loading"
      :img="cropperImageURL"
      @success="handleUploadCroppedImage"
    />
  </div>
</template>

<script>
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import MultipleUpload from './multiple-upload';
import ImageCropper from './image-cropper';
import { uploadFile, isImageFile, imageFileNeedCrop, checkFileSize, getImageInfo } from '../../utils';

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
  @Prop({ type: String }) uploadButtonText;

  FILE_INPUT_REF_NAME = 'fileInput';

  renderMultipleUploadDialog = true;
  showMultipleUploadDialog = false;
  showCroppper = false;
  cropperImageURL = '';
  loading = false;
  uploadProgressPct = 0; // 上传进度(百分比)

  get uploadButtonTextI18n() {
    return this.uploadButtonText || this.$t('bean.actionUpload');
  }

  get fileInputIsMultiple() {
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

  handleUploadCroppedImage(blob) {
    if (this.filename) {
      blob.name = this.filename;
    }
    return this.handleUpload(blob);
  }

  @Emit('success')
  async handleUpload(blob, tags) {
    this.loading = true;
    try {
      const updateUploadProgress = pct => this.uploadProgressPct = pct;
      const [uploadRes, imageInfo] = await Promise.all([
        uploadFile(blob, { ...this.$attrs, tags }, { onProgress: updateUploadProgress }),
        isImageFile(blob) ? getImageInfo(blob) : {}
      ]);
      return {
        ...imageInfo,
        ...uploadRes,
      };
    } finally {
      this.loading = false;
    }
  }

  async handleFileChange(e) {
    const file = e.target.files[0];
    this.filename = file.name;
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
      this.$message.error(this.$t('bean.maximumFileSize', { size: `${this.size}M` }));
      return;
    }
    this.handleUpload(file);
  }
}
</script>
