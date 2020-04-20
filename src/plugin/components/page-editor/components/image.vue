<template>
  <div class="c-image">
    <el-image
      v-for="(item, index) in value.data"
      :key="index"
      :src="item.src"
      fit="cover"
      class="item-image"
    >
      <div slot="error">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <ImageControlBox v-if="showController" title="图片" :links="links" :value="value.data" @change="handleChange" />
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
  export default class CImage extends Vue {
    @Model('change', { type: Object, default: () => ({
      data: [], // { src, link }
      config: {}
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

    handleChange(data) {
      this.value.data = data;
      this.syncChange();
    }

  }
</script>

<style lang="scss" scoped>
  .c-image {
    display: flex;
    align-items: stretch;

    .item-image {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
