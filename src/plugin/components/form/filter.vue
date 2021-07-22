<template>
  <AdminForm
    :value="value"
    :columns="columns"
    v-bind="{ inline: true, ...$attrs }"
    @submit="handleFilter"
    @change="$emit('change', $event)"
  >
    <template v-slot:action>
      <el-form-item>
        <el-button type="primary" native-type="submit">{{ $t('bean.actionFilter') }}</el-button>
        <el-button @click="$emit('reset')">{{ $t('bean.actionReset') }}</el-button>
      </el-form-item>
    </template>
  </AdminForm>
</template>

<script>
import { Vue, Component, Prop, Emit, Model } from 'vue-property-decorator';
import AdminForm from './index';

@Component({
  components: {
    AdminForm
  }
})
export default class AdminFilter extends Vue {
  @Prop({ type: Array, default: () => [] }) columns;
  @Model('change', { type: Object, default: () => ({}) }) value;

  getPureForm() {
    return JSON.parse(JSON.stringify(this.value));
  }

  @Emit('filter')
  handleFilter(data) {
    return data;
  }
}
</script>
