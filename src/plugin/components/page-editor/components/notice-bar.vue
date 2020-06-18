<template>
  <div class="c-notice-bar">
    <div class="notice-bar" v-for="(item, index) in value.data" :key="index" :style="noticeBarStyle">{{ item.text }}</div>
    <div class="tip" style="font-size: 12px; color: #ccc; text-align: center; padding: 10px;">通知栏: {{ tip }}</div>
    <ControlBox :visible="showController" @close="$emit('close')">
      <el-form @submit.native.prevent label-position="left" label-width="auto">
        <el-form-item label="文本" v-for="(item, index) in value.data" :key="index">
          <el-input type="textarea" :rows="5" autosize v-model="item.text" @change="syncChange" :placeholder="tip" />
        </el-form-item>
        <el-form-item label="颜色">
          <el-color-picker show-alpha v-model="value.config.color" @change="syncChange"></el-color-picker>
        </el-form-item>
        <el-form-item label="背景颜色">
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
  export default class CNoticeBar extends Vue {
    @Model('change', { type: Object, default: () => ({
      data: [
        {
          text: ''
        }
      ],
      config: {
        color: '#000',
        backgroundColor: '#fffbe8'
      }
    }) }) value;
    @Prop(Boolean) showController;

    tip = '请填写内容，如果过长，将会在手机上滚动显示';

    get noticeBarStyle() {
      return {
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        ...this.value.config,
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
