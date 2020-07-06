<template>
  <div class="nest-form-v2">
    <div class="nest-form-group" v-for="(group, index) in formGroup" :key="index">
      <SourceForm
        v-bind="$attrs"
        :form="group"
        :columns="columns"
        @change="handleGroupChange(index, $event)"
        ref="source-form"
      >
        <template v-slot:form-header>
          <i class="el-icon-delete btn-delete" @click="handleDelete(index)"></i>
        </template>
        <template v-slot:action>
          <span />
        </template>
      </SourceForm>
    </div>
    <el-button
      type="primary"
      size="small"
      @click="handleAdd"
      icon="el-icon-plus"
    >{{ $t('添加') }}</el-button>
  </div>
</template>

<script>
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';
  import SourceForm from './index';

  @Component({
    components: {
      SourceForm
    }
  })
  export default class NestForm extends Vue {
    @Model('change', { type: Array, default: () => [] }) value;
    @Prop({ type: Array, default: () => [] }) columns;
    @Prop({ type: [String, Number], default: 'id' }) destroyTrackBy; // 根据判断数据中有没有trackBy字段，删除后添加_destroy标识

    get formGroup() {
      return this.value.filter(item => !item._destroy);
    }

    mounted() {
      this.syncSourceFormRefs();
    }

    syncSourceFormRefs() {
      this.$emit('refsChange', this.$refs['source-form'])
    }

    getPureValue() {
      return JSON.parse(JSON.stringify(this.value));
    }

    handleGroupChange(index, data) {
      const value = this.getPureValue();
      value[index] = data;
      this.$emit('change', value);
    }

    async handleAdd() {
      this.$emit('change', this.value.concat({}));
      await this.$nextTick();
      this.syncSourceFormRefs();
    }

    async handleDelete(index) {
      const value = this.getPureValue();
      if (value[index][this.destroyTrackBy]) {
        value[index] = { ...value[index], _destroy: true };
      } else {
        value.splice(index, 1);
      }
      this.$emit('change', value);
      await this.$nextTick();
      this.syncSourceFormRefs();
    }
  }
</script>
