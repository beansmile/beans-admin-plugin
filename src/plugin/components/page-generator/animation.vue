<template>
  <div class="page-editor-animation-wrapper" :class="[`animation-${type}`]">
    <slot />
  </div>
</template>

<script>
  /*
   * 动画类型  说明
   * fade  淡入
   * scale-up  放大
   * scale-down  缩小
   * slide-top  上滑进入
   * slide-bottom  下滑进入
   * slide-left  左滑进入
   * slide-right  右滑进入
   * shake  抖动
   */

  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class Effect extends Vue {
    @Prop({ type: String, default: '' }) type;
  }

</script>
