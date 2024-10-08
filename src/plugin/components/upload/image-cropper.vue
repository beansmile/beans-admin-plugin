<template>
  <el-dialog
    :visible="value"
    fullscreen
    append-to-body
    :title="$t('bean.imageResizer')"
    custom-class="admin-image-cropper-dialog"
    @close="$emit('change', false)"
  >
    <div class="admin-image-cropper" v-loading="loading">
      <div class="content">
        <img class="image" :src="img" ref="img" width="0" height="0" />
      </div>
    </div>
    <template #footer>
      <el-button @click="handleReset">{{ $t('bean.actionReset') }}</el-button>
      <el-button type="primary" @click="handleSave">{{ $t('bean.actionConfirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';
  import _ from 'lodash';
  import Cropper from 'cropperjs';
  import 'cropperjs/dist/cropper.css';

  @Component
  export default class ImageCropper extends Vue {
    @Model('change', { type: Boolean }) value;
    @Prop(String) img;
    @Prop(Boolean) loading;
    @Prop({ type: Number, default: 200 }) width;
    @Prop({ type: Number, default: 200 }) height;

    @Watch('img', { immediate: true })
    async onImgChange() {
      await this.$nextTick();
      this.handleDestroyCropper();
      const defaultConfig = {
        aspectRatio: this.width / this.height,
        responsive: true,
        autoCropArea: 1,
        ..._.get(this, '$vadminConfig.cropper', {})
      }
      this.cropper = new Cropper(this.$refs.img, Object.assign(defaultConfig, this.$attrs));
    }

    handleDestroyCropper() {
      if (this.cropper) {
        this.cropper.destroy();
        this.cropper = null;
      }
    }

    beforeDestroy() {
      this.handleDestroyCropper();
    }

    handleSave() {
      const config = {
        imageSmoothingQuality: 'high',
        width: this.width,
        height: this.height
      }
      this.cropper.getCroppedCanvas(config).toBlob(blob => {
        this.$emit('success', blob);
        this.$emit('change', false);
      });
    }

    handleReset() {
      this.cropper.reset();
    }
  }
</script>
