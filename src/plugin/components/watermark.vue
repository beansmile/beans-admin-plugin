<template>
  <canvas
    ref="watermarkCanvas"
    class="watermark-canvas"
    :style="{ position: fullscreen ? 'fixed': 'absolute' }"
  />
</template>

<script>
  import { Vue, Component, Watch, Prop } from 'vue-property-decorator'
  import _ from 'lodash';

  @Component
  export default class Watermark extends Vue {
    @Prop({ type: String, default: '' }) text;
    @Prop({ type: Number, default: 20 }) xGap;
    @Prop({ type: Number, default: 75 }) yGap;
    @Prop({ type: Number, default: 0 }) yOffset;
    @Prop({ type: Number, default: 0 }) xOffset;
    @Prop({ type: String, default: 'rgba(0, 0, 0, 0.08)' }) fontColor;
    @Prop({ type: Boolean, default: true }) fullscreen;

    @Watch('text', { immediate: true })
    @Watch('xGap', { immediate: true })
    @Watch('yGap', { immediate: true })
    @Watch('yOffset', { immediate: true })
    @Watch('xOffset', { immediate: true })
    @Watch('fontColor', { immediate: true })
    @Watch('fullscreen', { immediate: true })
    onEmailChange() {
      this.addWatermarkDebounce();
    }

    mounted() {
      this.addWatermarkDebounce();
      window.addEventListener('resize', this.addWatermarkDebounce);
    }

    unmouted() {
      window.removeEventListener('resize', this.addWatermarkDebounce);
    }

    addWatermark() {
      const canvas = this.$refs.watermarkCanvas;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      // 分辨率
      const ratio = 2;

      // 使用两倍的分辨率
      const width = window.innerWidth * ratio;
      const height = window.innerHeight * ratio;

      // 设置画布的尺寸
      canvas.width = width;
      canvas.height = height;

      // 清空画布所有内容
      ctx.clearRect(0, 0, width, height);

      // 设置字体和透明度
      const textHeight = 30; // 字体大小
      ctx.font = `${textHeight}px Arial`;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 计算文字重复的间隔和行间距
      const textWidth = ctx.measureText(this.text).width;
      const angle = -Math.PI / 8;

      // 横向间距
      const xGap = textWidth + this.xGap * ratio;
      // 竖向间距
      const yGap = textHeight + this.yGap * ratio;

      const xOffset = parseInt(this.xOffset) * ratio;
      const yOffset = parseInt(this.yOffset) * ratio;

      // 绘制平铺水印
      for (let x = - textWidth; x < width + textWidth; x += xGap) {
        for (let y = textHeight; y < height + textHeight; y += yGap) {
          // 判断单行还是双行
          const isEven = Math.floor(y / yGap) % 2 === 0;
          ctx.translate(x / 2, y / 2);
          ctx.rotate(angle);
          const newX = isEven ? x : x + (xGap / 2);
          ctx.fillText(this.text, newX + xOffset, y + yOffset);
          ctx.rotate(-angle);
          ctx.translate(-x / 2, -y / 2);
        }
      }
    }

    addWatermarkDebounce = _.debounce(this.addWatermark, 300);
  }
</script>

<style lang="scss" scoped>
.watermark-canvas {
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
