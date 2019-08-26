<template>
  <div class="preview-image" @click="toggleShow">
    <slot></slot>
    <el-dialog
      :visible="show"
      fullscreen
      append-to-body
      custom-class="dialog-preview"
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

<style lang="less" scoped>
  .preview-image {
    display: inline-block;
  }

  // TODO table上的滚动条可能显示出来
  /deep/ .dialog-preview {
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, .8);

    .el-icon-close {
      font-size: 30px;
      color: #fff;
    }

    .el-dialog__body {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .img {
      max-height: 100%;
      max-width: 100%;
    }
  }
</style>
