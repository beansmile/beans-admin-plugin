<template>
  <div v-if="showButton" style="display: inline-block;">
    <el-button type="primary" @click="handleShowCropper" :disabled="disabled">裁剪图片</el-button>
    <ImageCropper
      v-model="show"
      v-bind="cropper"
      v-if="img"
      :img="img"
      :loading="loading"
      v-on="$listeners"
    />
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import ImageCropper from './image-cropper';
  import { isImageFile } from '../../utils';

  @Component({
    components: {
      ImageCropper
    }
  })
  export default class AdminImageCropperAction extends Vue {
    @Prop(Object) cropper;
    @Prop(Object) file;
    @Prop(Boolean) loading;
    @Prop(Boolean) disabled;
    show = false;
    img = '';

    get showButton() {
      return this.file && this.cropper && isImageFile(this.file);
    }

    handleShowCropper() {
      this.img = window.URL.createObjectURL(this.file);
      this.show = true;
    }
  }
</script>
