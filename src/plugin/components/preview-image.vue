<template>
  <el-image
    v-bind="{
      src: current,
      previewSrcList: [current],
      ...$attrs
    }"
  />
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class PreviewImage extends Vue {
  @Prop(String) current;

  created() {
    console.warn('<c-preview-image />已废弃， 请使用 <el-image /> https://element.eleme.cn/#/zh-CN/component/image');
  }
}
</script>
