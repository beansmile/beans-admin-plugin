<template>
  <div class="c-block">

    <div class="block" :style="blockStyle"></div>

    <ControlBox :title="$t('pageEditor.占位块')" :visible="showController" @close="$emit('close')">
      <el-form @submit.native.prevent label-position="left" label-width="auto">
        <el-form-item :label="$t('pageEditor.块高度')">
          <el-input-number v-model="value.config.height" @change="syncChange" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.块背景颜色')">
          <el-color-picker show-alpha v-model="value.config.backgroundColor" @change="syncChange"></el-color-picker>
        </el-form-item>
      </el-form>
    </ControlBox>
  </div>
</template>


<script>
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';
  import ControlBox from '../control-box';

  @Component({
    components: {
      ControlBox
    }
  })
  export default class CBlock extends Vue {
    @Model('change', { type: Object, default: () => ({
      data: [],
      config: {
        height: 20,
        backgroundColor: '#fff'
      }
    }) }) value;
    @Prop(Boolean) showController;

    get blockStyle() {
      const { height, backgroundColor } = this.value.config;
      return {
        height: height + 'px',
        backgroundColor
      }
    }

    mounted() {
      this.syncChange();
    }

    syncChange() {
      this.$emit('change', this.value);
    }
  }
</script>

<style lang="scss" scoped>
  .block {
    width: 100%;
  }
</style>
