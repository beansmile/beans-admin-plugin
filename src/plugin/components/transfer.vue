<template>
  <div class="c-transfer">
    <div class="panel panel-left">
      <div class="panel-header">
        <el-checkbox :value="leftSelected.length && leftSelected.length ===  pabelData[0].length" @change="handleToggleLeftPanelSelect">{{ titles[0] }}</el-checkbox>
        <span class="indicator">{{ leftSelected.length }} / {{ pabelData[0].length }}</span>
      </div>
      <div class="panel-content">
        <el-checkbox-group v-model="leftSelected">
          <el-checkbox v-for="item in pabelData[0]" :key="item.value" :label="item.value" :class="{ active: rightSelected.includes(item.value) }">{{ item.name }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
    <div class="btns">
      <el-button icon="el-icon-arrow-left" circle :disabled="!rightSelected.length" @click="handleToLeft"></el-button>
      <el-button icon="el-icon-arrow-right" circle :disabled="!leftSelected.length" @click="handleToRight"></el-button>
    </div>
    <div class="panel panel-right">
      <div class="panel-header">
        <el-checkbox :value="rightSelected.length && rightSelected.length ===  pabelData[1].length" @change="handleToggleRightPanelSelect">{{ titles[1] }}</el-checkbox>
        <span class="indicator">{{ rightSelected.length }} / {{ pabelData[1].length }}</span>
      </div>
      <div class="panel-content">
        <el-checkbox-group v-model="rightSelected">
          <draggable class="drag-content" :value="pabelData[1]" @end="handleDragChange">
            <el-checkbox v-for="item in pabelData[1]" :key="item.value" :label="item.value" :class="{ active: rightSelected.includes(item.value) }">{{ item.name }}</el-checkbox>
          </draggable>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';
  import _ from 'lodash';
  import draggable from 'vuedraggable';
  import { arrayMove } from '../utils';

  @Component({
    components: {
      draggable
    }
  })
  export default class Transfer extends Vue {
    @Model('change', { type: Array, default: () => [] }) value;
    @Prop({ type: Array, default: () => [] }) data;
    @Prop({ type: Array, default: () => ['列表1', '列表2'] }) titles;

    leftSelected = [];
    rightSelected = [];
    dataLocal = [];

    get pabelData() {
      const leftPanel = [];
      const rightPanel = [];
      this.dataLocal.forEach(item => {
        this.value.includes(item.value) ? rightPanel.push(item) : leftPanel.push(item);
      });
      const rightPanelSorted = this.value.map(value => rightPanel.find(item => item.value === value));
      return [leftPanel, rightPanelSorted];
    }

    handleToRight() {
      this.$emit('change', this.value.concat(this.leftSelected));
      this.leftSelected = [];
    }

    handleToLeft() {
      this.$emit('change', _.difference(this.value, this.rightSelected));
      this.rightSelected = [];
    }

    handleToggleLeftPanelSelect(val) {
      this.leftSelected = val ? this.pabelData[0].map(item => item.value) : [];
    }

    handleToggleRightPanelSelect(val) {
      this.rightSelected = val ? this.pabelData[1].map(item => item.value) : [];
    }

    handleDragChange({ oldIndex, newIndex }) {
      if (oldIndex !== newIndex) {
        this.$emit('change', arrayMove(this.value, oldIndex, newIndex));
      }
    }

    @Watch('data', { immediate: true })
    onDataChange(newVal) {
      if (newVal) {
        this.dataLocal = _.cloneDeep(newVal);
      }
    }
  }
</script>
