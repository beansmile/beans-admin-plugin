<template>
  <div :class="[`animation-${type}`]">
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

<style scoped>
  /* css 滤镜 控制黑白底色gif的 */
  .gif-black {
    mix-blend-mode: screen;
  }

  .gif-white {
    mix-blend-mode: multiply;
  }

  /* Animation css */
  [class*='animation-'] {
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-fill-mode: both;
  }

  .animation-fade {
    animation-name: fade;
    animation-duration: 0.8s;
    animation-timing-function: linear;
  }

  .animation-scale-up {
    animation-name: scale-up;
  }

  .animation-scale-down {
    animation-name: scale-down;
  }

  .animation-slide-top {
    animation-name: slide-top;
  }

  .animation-slide-bottom {
    animation-name: slide-bottom;
  }

  .animation-slide-left {
    animation-name: slide-left;
    animation-duration: 1s;
  }

  .animation-slide-right {
    animation-name: slide-right;
    animation-duration: 1s;
  }

  .animation-shake {
    animation-name: shake;
  }

  .animation-reverse {
    animation-direction: reverse;
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes scale-up {
    0% {
      opacity: 0;
      transform: scale(0.2);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes scale-down {
    0% {
      opacity: 0;
      transform: scale(1.8);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slide-top {
    0% {
      opacity: 0;
      transform: translateY(-100%);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-bottom {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }

    10% {
      transform: translateX(-9px);
    }

    20% {
      transform: translateX(8px);
    }

    30% {
      transform: translateX(-7px);
    }

    40% {
      transform: translateX(6px);
    }

    50% {
      transform: translateX(-5px);
    }

    60% {
      transform: translateX(4px);
    }

    70% {
      transform: translateX(-3px);
    }

    80% {
      transform: translateX(2px);
    }

    90% {
      transform: translateX(-1px);
    }
  }

  @keyframes slide-left {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slide-right {
    0% {
      opacity: 0;
      transform: translateX(100%);
    }

    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
