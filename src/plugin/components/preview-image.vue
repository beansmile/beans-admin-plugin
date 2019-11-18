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
}
</script>
