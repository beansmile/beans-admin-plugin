<template>
  <div class="c-swiper">

    <div class="scroll-x" style="display: flex; white-space: nowrap; overflow-x: scroll">
      <img v-for="(item, index) in value.data" :key="index" :src="item.src" className="item-image" :style="{ width: value.config.width + 'px', height: value.config.height + 'px', objectFit: 'cover', verticalAlign: 'top', flexShrink: 0 }" />
    </div>

    <ImageControlBox :visible="showController" title="横向滚动" :links="links" v-model="value.data" @change="syncChange" @close="$emit('close')">
      <el-form @submit.native.prevent>
        <el-form-item label="图片宽度">
          <el-input-number v-model="value.config.width" @change="syncChange" />
        </el-form-item>
        <el-form-item label="图片高度">
          <el-input-number v-model="value.config.height" @change="syncChange" />
        </el-form-item>
      </el-form>
    </ImageControlBox>
  </div>
</template>

<script>
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';
  import ImageControlBox from '../image-control-box';
  import _ from 'lodash';

  @Component({
    components: {
      ImageControlBox
    }
  })
  export default class Swiper extends Vue {
    @Model('change', { type: Object, default: () => ({
      data: [], // { id, src, link }
      config: {
        width: 200,
        height: 200,
        flexShrink: 0
      }
    }) }) value;
    @Prop(Object) data;
    @Prop(Boolean) showController;

    mounted() {
      this.syncChange();
    }

    get links() {
      return _.get(this.data, 'links') || []
    }

    syncChange() {
      this.$emit('change', this.value);
    }
  }
</script>
