<template>
  <div class="page-creator-collapse-item">
    <el-dialog
      class="dialog-page-creator-collapse-item"
      append-to-body
      fullscreen
      :visible="dialogVisible"
      @close="handleClose"
    >
      <bean-admin-page-creator
        :show-page-setting="false"
        v-model="page"
        :use-components="useComponents"
        :useEvents="useEvents"
        :pages="pages"
      />
      <template #footer>
        <el-button type="primary" @click="handleClose">{{ $t('bean.actionClose') }}</el-button>
      </template>
    </el-dialog>

    <el-button type="primary" icon="el-icon-edit" circle @click="handleOpen"></el-button>
  </div>
</template>

<script>
import { Vue, Component, Model, Emit, Prop } from 'vue-property-decorator';
import _ from 'lodash';

@Component
export default class CollapseItem extends Vue {
  @Model('change', { type: Object, default: () => ({}) }) value;
  @Prop({ type: Object, default: () => ({}) }) enabledComponents;
  @Prop(Array) useEvents;
  @Prop({ type: [Array, Function], default: () => [] }) pages;

  dialogVisible = false;
  page = {};

  get useComponents() {
    return _.filter(this.enabledComponents, val => !val.global);
  }

  handleOpen() {
    this.page = _.cloneDeep(this.value);
    this.dialogVisible = true;
  }

  @Emit('change')
  handleClose() {
    this.dialogVisible = false;
    return _.cloneDeep(this.page);
  }
}
</script>
