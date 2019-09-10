<template>
  <div class="c-preview-image" @click="toggleShow">
    <slot></slot>
    <el-dialog
      :visible="show"
      fullscreen
      append-to-body
      custom-class="c-dialog-preview"
      @close="toggleShow"
    >
      <img :src="current" class="img" />
    </el-dialog>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class PreviewImage extends Vue {
  @Prop(Array) urls; // TODO 多张待实现
  @Prop(String) current;

  show = false;

  toggleShow() {
    this.show = !this.show;
  }
}
</script>
