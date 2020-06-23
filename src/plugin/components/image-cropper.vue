<template>
  <div class="c-image-cropper" v-loading="loading">
    <div class="content">
      <img class="image" :src="img" ref="img" />
    </div>
    <el-row class="btn-group">
      <el-button @click="handleReset" size="medium">重置</el-button>
      <el-button type="primary" @click="handleSave" size="medium">确定</el-button>
    </el-row>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.css';

  @Component
  export default class ImageCropper extends Vue {
    @Prop(String) img;
    @Prop(Boolean) loading;
    @Prop({ type: Number, default: 200 }) width;
    @Prop({ type: Number, default: 200 }) height;

    mounted() {
      const defaultConfig = {
        aspectRatio: this.width / this.height,
        responsive: true,
        autoCropArea: 1
      }
      this.cropper = new Cropper(this.$refs.img, Object.assign(defaultConfig, this.$attrs))
    }

    beforeDestroy() {
      this.cropper && this.cropper.destroy()
    }

    handleSave() {
      const config = {
        imageSmoothingQuality: 'high',
        width: this.width,
        height: this.height
      }
      this.cropper.getCroppedCanvas(config).toBlob(blob => {
        this.$emit('change', blob);
      });
    }

    handleReset() {
      this.cropper.reset();
    }
  }
</script>
