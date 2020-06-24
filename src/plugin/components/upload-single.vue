<template>
  <div class="c-upload-single">
    <slot :disabled="disabled" :loading="!showCropper && loading" />
    <input
      :disabled="disabled"
      type="file"
      @change="handleFileChange"
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
    fileType = '';

    handleDialogClosed() {
      this.renderCropper = false;
      this.$nextTick(() => this.renderCropper = true);
    }

    async handleFileChange(e) {
      const file = e.target.files[0];
      // 相同文件change事件不会触发
      e.target.value = '';
      this.fileName = file.name;
      this.fileType = file.type;
      if (file.size > this.size * 1024 * 1024) {
        this.$message.error(`文件最大 ${this.size}M`);
        return;
      }
      if (file.type.startsWith('image') && this.cropper && this.cropper.width && this.cropper.height) {

        this.loading = true;
        const { width, height } = await this.getImageInfo(file);
        this.loading = false;

        if (width && height) {
          // 可接受的误差
          const avaliableOffset = 2;
          const offset = Math.floor(Math.abs(this.cropper.width / this.cropper.height - width / height) * 100);
          // 误差比较大弹出裁剪框，否则直接上传
          if (offset > avaliableOffset) {
            this.img = URL.createObjectURL(file);
            this.showCropper = true;
            return;
          }
        }
      }
      this.handleUpload(file);
    }

    async getImageInfo(file) {
      if (file.type.startsWith('image')) {
        try {
          const res = await getImageInfo(URL.createObjectURL(file));
          return res;
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
      if (!file.type) {
        file.type = this.fileType;
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
