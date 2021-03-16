<template>
  <div class="page-editor-image-area">
    <Animation :type="$get(value, 'animation.type', '')">
      <div class="preview" @click="dialogVisible = true">
        <img :src="value.image" class="image" />
        <div
          class="item-area"
          v-for="(item, index) in areas"
          :key="index"
          :style="item.style"
        />
      </div>
      <el-dialog
        :visible.sync="dialogVisible"
        @change="dialogVisible = false"
        fullscreen
        append-to-body
        custom-class="dialog-image-area"
      >
        <ImageArea
          :event-props="{ pages, popupComponents }"
          :value="value"
          @change="handleChange"
        />
      </el-dialog>
    </Animation>

     <Controller
      animation
      :popup-components="popupComponents"
      :visible="showController"
      :value="value"
      :pages="pages"
      :columns="baseConfigColumns"
      :styleColumns="styleConfigColumns"
      @change="$emit('change', $event)"
    />
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';
  import Animation from '../animation';
  import ImageArea from '../../image-area';
    import Controller from '../controller';

  const defaultValue = {
    containerWidth: 750,
    image: 'https://via.placeholder.com/200x200/ccc',
    areas: []
  }

  @Component({
    components: {
      Animation,
      ImageArea,
      Controller
    }
  })
  export default class PageEditorImageArea extends Vue {
    @Prop({ type: Object, default: () => defaultValue }) value;
    @Prop({ type: [Array, Function], default: () => ([]) }) pages;
    @Prop(Boolean) showController;
    @Prop({ type: Array, default: () => ([]) }) popupComponents;

    dialogVisible = false;

    handleChange($event) {
      this.$emit('change', $event);
      this.dialogVisible = false;
    }

    get areas() {
      const baseW = 375;
      const containerW = _.get(this.value, 'containerWidth');
      const ratio = baseW / containerW;
      const areas = _.get(this.value, 'areas') || [];

      return areas.map(item => {
        const body = {
          ...item,
          width: ratio * item.width,
          height: ratio * item.height,
          top: ratio * item.top,
          left: ratio * item.left
        }

        body.style = {
          width: `${body.width}px`,
          height: `${body.height}px`,
          top: `${body.top}px`,
          left: `${body.left}px`
        }
        return body;
      });
    }
  }
</script>
