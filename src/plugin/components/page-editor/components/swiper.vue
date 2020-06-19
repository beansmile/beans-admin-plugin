<template>
  <div class="c-swiper">
    <el-carousel
      trigger="click"
      :height="value.config.height + 'px'"
      :autoplay="value.config.autoplay"
      :interval="value.config.interval"
      arrow="never"
    >
      <el-carousel-item v-for="(item, index) in value.data" :key="index">
        <img :src="item.src" className="item-image" style="width: 100%; height: 100%; object-fit: cover" />
      </el-carousel-item>
    </el-carousel>

    <ImageControlBox :visible="showController" :title="$t('pageEditor.轮播图')" :links="links" v-model="value.data" @change="syncChange" @close="$emit('close')">
      <el-form @submit.native.prevent label-position="left" label-width="auto">
        <el-form-item :label="$t('pageEditor.轮播图高度')">
          <el-input-number v-model="value.config.height" @change="syncChange" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.是否显示面板指示点')">
          <el-switch v-model="value.config.indicatorDots" @change="syncChange" />
          <small>（{{$t('pageEditor.无预览效果')}}）</small>
        </el-form-item>
        <el-form-item :label="$t('pageEditor.指示点颜色')">
          <el-color-picker show-alpha v-model="value.config.indicatorColor" @change="syncChange"></el-color-picker>
          <small>（{{$t('pageEditor.无预览效果')}}）</small>
        </el-form-item>
        <el-form-item :label="$t('pageEditor.当前选中的指示点颜色')">
          <el-color-picker show-alpha v-model="value.config.indicatorActiveColor" @change="syncChange"></el-color-picker>
          <small>（{{$t('pageEditor.无预览效果')}}）</small>
        </el-form-item>
        <el-form-item :label="$t('pageEditor.是否自动切换')">
          <el-switch v-model="value.config.autoplay" @change="syncChange" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.自动切换时间间隔(毫秒)')">
          <el-input-number v-model="value.config.interval" @change="syncChange" />
          <small>（{{$t('pageEditor.无预览效果')}}）</small>
        </el-form-item>
        <el-form-item :label="$t('pageEditor.滑动动画时长(毫秒)')">
          <el-input-number v-model="value.config.duration" @change="syncChange" />
          <small>（{{$t('pageEditor.无预览效果')}}）</small>
        </el-form-item>
        <el-form-item :label="$t('pageEditor.是否采用衔接滑动')">
          <el-switch v-model="value.config.circular" @change="syncChange" />
          <small>（{{$t('pageEditor.无预览效果')}}）</small>
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
        height: 200,
        indicatorDots: true,
        indicatorColor: 'rgba(0, 0, 0, .3)',
        indicatorActiveColor: '#000000',
        autoplay: true,
        interval: 5000,
        duration: 500,
        circular: false
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

<style lang="scss" scoped>
  .el-color-picker {
    vertical-align: middle;
  }
</style>

