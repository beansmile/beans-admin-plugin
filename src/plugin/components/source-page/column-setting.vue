<template>
  <div class="admin-column-setting">
    <el-popover
      trigger="click"
    >
      <el-tree
        show-checkbox
        node-key="prop"
        draggable
        :data="columns"
        :props="{ label: 'label' }"
        :default-checked-keys="value"
        @check="handleChange"
      />
      <el-button slot="reference" class="btn-setting" icon="el-icon-setting" type="primary" circle></el-button>
    </el-popover>
  </div>
</template>

<script>
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';

@Component
export default class ColumnSetting extends Vue {
  @Model('change', { type: Array, default: [] }) value;
  @Prop({ type: Array, default: () => [] }) columns;

  @Emit('change')
  handleChange(_, { checkedKeys }) {
    return checkedKeys;
  }
}
</script>
