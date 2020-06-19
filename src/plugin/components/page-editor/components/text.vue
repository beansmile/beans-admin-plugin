<template>
  <div class="c-text">

    <div class="text" v-for="(item, index) in value.data" :key="index" :style="textStyle">{{ item.text }}</div>

    <ControlBox :title="$t('pageEditor.文本')" :visible="showController" @close="$emit('close')">
      <el-form @submit.native.prevent label-position="left" label-width="auto">
        <el-form-item :label="$t('pageEditor.文本')" v-for="(item, index) in value.data" :key="index">
          <el-input type="textarea" :rows="5" autosize v-model="item.text" @change="syncChange" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.颜色')">
          <el-color-picker show-alpha v-model="value.config.color" @change="syncChange"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('pageEditor.背景颜色')">
          <el-color-picker show-alpha v-model="value.config.backgroundColor" @change="syncChange"></el-color-picker>
        </el-form-item>
        <el-form-item :label="$t('pageEditor.文字大小')">
          <el-input-number v-model="value.config.fontSize" @change="syncChange"/>
        </el-form-item>
        <el-form-item :label="$t('pageEditor.行高')">
          <el-input-number v-model="value.config.lineHeight" @change="syncChange"/>
        </el-form-item>
        <el-form-item :label="$t('pageEditor.字重')">
          <el-select v-model="value.config.fontWeight" @change="syncChange">
            <el-option
              v-for="item in fontWeightOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select >
        </el-form-item>
        <el-form-item :label="$t('pageEditor.上间距')">
          <el-input-number v-model="value.config.paddingTop" @change="syncChange" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.下间距')">
          <el-input-number v-model="value.config.paddingBottom" @change="syncChange" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.左间距')">
          <el-input-number v-model="value.config.paddingLeft" @change="syncChange" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.右间距')">
          <el-input-number v-model="value.config.paddingRight" @change="syncChange" />
        </el-form-item>
      </el-form>
    </ControlBox>
  </div>
</template>

<script>
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';
  import ControlBox from '../control-box';
  import _ from 'lodash';

  @Component({
    components: {
      ControlBox
    }
  })
  export default class CText extends Vue {
    @Model('change', { type: Object, default: () => ({
      data: [
        {
          text: '文本'
        }
      ],
      config: {
        boxSizing: 'border-box',
        color: '#000',
        backgroundColor: '#fff',
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'left',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        fontWeight: 'normal'
      }
    }) }) value;
    @Prop(Boolean) showController;

    get fontWeightOptions() {
      return [
        {
          label: this.$t('默认'),
          value: 'normal'
        },
        {
          label: 'bold',
          value: 'bold'
        },
        {
          label: 'bolder',
          value: 'bolder'
        },
      ].concat(
        _.range(100, 1000, 100).map(item => ({
          label: item,
          value: item
        }))
      )
    }

    get textStyle() {
      const { fontSize, lineHeight,  paddingLeft, paddingRight, paddingTop, paddingBottom } = this.value.config;
      return {
        ...this.value.config,
        fontSize: fontSize + 'px',
        lineHeight: lineHeight + 'px',
        paddingLeft: paddingLeft + 'px',
        paddingRight: paddingRight + 'px',
        paddingTop: paddingTop + 'px',
        paddingBottom: paddingBottom + 'px',
      };
    }

    mounted() {
      this.syncChange();
    }

    syncChange() {
      this.$emit('change', this.value);
    }
  }
</script>
