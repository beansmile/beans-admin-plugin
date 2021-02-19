<template>
  <div class="admin-action-area"
    :class="{ active }"
    :style="style"
    @mousedown.stop="handleMove"
    v-on="$listeners"
  >
    <div class="indicator-container" @mousedown="handleIndicator">
      <div class="js-indicator js-top-left indicator indicator-top-left"></div>
      <div class="js-indicator js-top-center indicator indicator-top-center"></div>
      <div class="js-indicator js-top-right indicator indicator-top-right"></div>
      <div class="js-indicator js-center-left indicator indicator-center-left"></div>
      <div class="js-indicator js-center-right indicator indicator-center-right"></div>
      <div class="js-indicator js-bottom-left indicator indicator-bottom-left"></div>
      <div class="js-indicator js-bottom-center indicator indicator-bottom-center"></div>
      <div class="js-indicator js-bottom-right indicator indicator-bottom-right"></div>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';

  @Component
  export default class AdminActionArea extends Vue {
    @Model('change', { type: Object, default: () => {} }) value;
    @Prop(DOMRect) containerRect;
    @Prop(Boolean) active;

    get style() {
      return {
        top: `${this.value.top}px`,
        left: `${this.value.left}px`,
        width: `${this.value.width}px`,
        height: `${this.value.height}px`,
        zIndex: this.value.zIndex
      }
    }

    syncValue(body) {
      this.$emit('change', {
        ...this.value,
        ...body
      });
    }

    handleMove(e) {
      if (e.which !== 1) {
        return;
      }
      const target = this.$el;
      const containerRect = this.containerRect;
      const targetRect = target.getBoundingClientRect();
      const offsetX = e.x - targetRect.x;
      const offsetY = e.y - targetRect.y;

      const mousemoveHandler = e => {
        const { x: containerX, y: containerY, width: containerWidth, height: containerHeight } = containerRect;
        const maxLeft = containerX + containerWidth - targetRect.width;
        const minLeft = containerX;
        const maxTop = containerY + containerHeight - targetRect.height;
        const minTop = containerY;
        const x = e.x - offsetX;
        const y = e.y - offsetY;
        const left = Math.min(Math.max(x, minLeft), maxLeft);
        const top = Math.min(Math.max(y, minTop), maxTop);
        const relativeLeft = left - containerRect.x;
        const relativeTop = top - containerRect.y;
        this.syncValue({
          left: relativeLeft,
          top: relativeTop
        });
      }

      const mouseupHandler = () => {
        document.removeEventListener('mousemove', mousemoveHandler);
        document.removeEventListener('mouseup', mouseupHandler);
      }

      document.addEventListener('mousemove', mousemoveHandler);
      document.addEventListener('mouseup', mouseupHandler);
    }

    handleIndicator(e) {
      if (e.which !== 1) {
        return;
      }
      const containerRect = this.containerRect;
      const boundaryPoint = {
        x: [containerRect.x, containerRect.x + containerRect.width],
        y: [containerRect.y, containerRect.y + containerRect.height]
      };

      const classList = [...e.target.classList];
      if (classList.includes('js-indicator')) {
        e.stopPropagation();

        const mousemoveHandler = e => {
          const x = Math.min(Math.max(boundaryPoint.x[0], e.x), boundaryPoint.x[1]);
          const y = Math.min(Math.max(boundaryPoint.y[0], e.y), boundaryPoint.y[1]);
          const classListText = classList.join(' ');
          const syncBody = {};
          const gap = 10;
          if (classListText.includes('left')) {
            const maxLeft = this.value.left + this.value.width - gap;
            const left = Math.min(x - containerRect.x, maxLeft);
            Object.assign(syncBody, {
              left,
              width: this.value.width - (left - this.value.left)
            });
          }
          if (classListText.includes('right')) {
            const width = x - (this.value.left + containerRect.x);
            Object.assign(syncBody, {
              width: Math.max(gap, width)
            });
          }
          if (classListText.includes('top')) {
            const maxTop = this.value.top + this.value.height - gap;
            const top = Math.min(y - containerRect.y, maxTop);
            Object.assign(syncBody, {
              top,
              height: this.value.height - (top - this.value.top)
            });
          }
          if (classListText.includes('bottom')) {
            const height = y - (this.value.top + containerRect.y);
            Object.assign(syncBody, {
              height: Math.max(gap, height)
            });
          }
          this.syncValue(syncBody);
        }

        const mouseupHandler = () => {
          document.removeEventListener('mousemove', mousemoveHandler);
          document.removeEventListener('mouseup', mouseupHandler);
        }

        document.addEventListener('mousemove', mousemoveHandler);
        document.addEventListener('mouseup', mouseupHandler);
      }
    }
  }
</script>
