<template>
  <div class="c-video">
    <template v-for="(item, index) in value.data">
      <video
        v-if="item.src"
        :key="index"
        class="video"
        :style="videoStyle"
        :src="item.src"
        :controls="value.config.controls"
        :muted="value.config.muted"
        :autoplay="value.config.autoplay"
        :loop="value.config.loop"
      />
    </template>

    <ControlBox title="视频" :visible="showController" @close="$emit('close')">
      <el-form @submit.native.prevent label-position="left" label-width="auto">
        <el-form-item label="视频高度">
          <el-input-number :value="value.config.height" @change="handleConfigChange('height', $event)" />
        </el-form-item>
        <el-form-item label="视频左边间距">
          <el-input-number :value="value.config.paddingLeft" @change="handleConfigChange('paddingLeft', $event)" />
        </el-form-item>
        <el-form-item label="视频右边边间距">
          <el-input-number :value="value.config.paddingRight" @change="handleConfigChange('paddingRight', $event)" />
        </el-form-item>
        <el-form-item label="视频的表现形式">
          <el-select :value="value.config.objectFit" @change="handleConfigChange('objectFit', $event)">
            <el-option
              v-for="option in objectFitOptions"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="是否显示播放控件">
          <el-switch :value="value.config.controls" @change="handleConfigChange('controls', $event)" />
        </el-form-item>
        <el-form-item label="是否自动播放">
          <el-switch :value="value.config.autoplay" @change="handleConfigChange('autoplay', $event)" />
        </el-form-item>
        <el-form-item label="是否循环播放">
          <el-switch :value="value.config.loop" @change="handleConfigChange('loop', $event)" />
        </el-form-item>
        <el-form-item label="是否静音播放">
          <el-switch :value="value.config.muted" @change="handleConfigChange('muted', $event)" />
        </el-form-item>
      </el-form>
      <Upload
        accept="video/*"
        :size="100"
        @success="handleSubmit"
      />
    </ControlBox>
  </div>
</template>

<script>
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';
  import ControlBox from '../control-box';
  import Upload from '../../upload';
  import _ from 'lodash';

  @Component({
    components: {
      ControlBox,
      Upload
    }
  })
  export default class CVideo extends Vue {
    @Model('change', { type: Object, default: () => ({
      data: [
        {
          src: ''
        }
      ],
      config: {
        height: 230,
        controls: true,
        autoplay: false,
        loop: true,
        muted: false,
        objectFit: 'contain',
        paddingLeft: 0,
        paddingRight: 0,
      }
    }) }) value;
    @Prop(Boolean) showController;

    get objectFitOptions() {
      return [
        {
          label: '包含',
          value: 'contain'
        },
        {
          label: '填充',
          value: 'fill'
        },
        {
          label: '覆盖',
          value: 'cover'
        }
      ]
    }

    get videoStyle() {
      const { height, objectFit, paddingLeft, paddingRight } = this.value.config;
      return {
        height: height + 'px',
        objectFit,
        paddingLeft: paddingLeft + 'px',
        paddingRight: paddingRight + 'px',
      }
    }

    mounted() {
      this.syncChange();
    }

    handleConfigChange(key, val) {
      const value = _.cloneDeep(this.value);
      _.set(value.config, key, val);
      this.syncChange(value);
    }

    syncChange(value) {
      this.$emit('change', value || this.value);
    }

    handleSubmit(data) {
      const value = _.cloneDeep(this.value);
      this.$set(value, 'data', [{ src: data.url }]);
      this.syncChange(value);
    }
  }
</script>

<style lang="scss" scoped>
  .video {
    box-sizing: border-box;
    width: 100%;
    vertical-align: top;
  }
</style>
