<template>
  <div class="c-upload-single" v-loading="!showCropper && loading">
    <slot />
    <input
      :disabled="disabled"
      type="file"
      @input="handleFileChange"
      :accept="accept"
    />

    <el-dialog
      v-if="renderCropper"
      custom-class="upload-single-dialog"
      fullscreen
      :visible="showCropper"
      append-to-body
      title="图片裁剪"
      @close="showCropper = false"
      @closed="handleDialogClosed"
    >
      <c-image-cropper
        v-bind="cropper"
        :img="img"
        :loading="loading"
        @change="handleUpload"
      />
    </el-dialog>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { upload, getImageInfo } from '../utils';

  @Component
  export default class UploadSingle extends Vue {
    @Prop({ type: Boolean }) disabled;
    @Prop({ type: String, default: 'image/*' }) accept;
    @Prop({ type: Number, default: 3 }) size; // 单位M
    @Prop({ type: Object }) cropper;

    loading = false;
    renderCropper = true;
    showCropper = false;
    img = '';
    fileName = '';

    handleDialogClosed() {
      this.renderCropper = false;
      this.$nextTick(() => this.renderCropper = true);
    }

    handleFileChange(e) {
      const file = e.target.files[0];
      this.fileName = file.name;
      if (file.size > this.size * 1024 * 1024) {
        this.$message.error(`文件最大 ${this.size}M`);
        return;
      }
      if (file.type.startsWith('image') && this.cropper && this.cropper.width) {
        this.img = URL.createObjectURL(file);
        this.showCropper = true;
      } else {
        this.handleUpload(file);
      }
    }

    async getImageInfo(file) {
      if (file.type.startsWith('image')) {
        try {
          return getImageInfo(URL.createObjectURL(file));
        } catch (e) {
          return {}
        }
      } else {
        return {}
      }
    }

    async handleUpload(blob) {
      this.loading = true;
      let file = blob.slice();
      if (!file.name) {
        file.name = this.fileName;
      }
      try {
        const [fileUrl, imageInfo] = await Promise.all([
          upload(file, false, this.$attrs),
          this.getImageInfo(file)
        ]);
        this.$emit('change', [{ src: fileUrl, ...imageInfo }]);
        this.$emit('success', fileUrl);
        this.showCropper = false;
      } finally {
        this.loading = false;
      }
    }
  }
</script>
