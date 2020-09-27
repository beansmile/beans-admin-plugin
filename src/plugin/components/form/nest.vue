<template>
  <div class="admin-nest-form">
    <div class="nest-form-group" v-for="(group, index) in formGroup" :key="index">
      <AdminForm
        v-bind="$attrs"
        :value="group"
        :columns="columns"
        @change="handleGroupChange(index, $event)"
        :ref="FORM_REF_NAME"
      >
        <template v-slot:header>
          <el-button class="btn-delete" type="danger" size="small" icon="el-icon-delete" @click="handleDelete(index)" circle></el-button>
        </template>
        <template v-slot:action>
          <span />
        </template>
      </AdminForm>
    </div>
    <el-button class="btn-add" type="primary" size="small" @click="handleAdd" icon="el-icon-plus">{{ addButtonText }}</el-button>
  </div>
</template>

<script>
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';
  import AdminForm from './index';

  @Component({
    components: {
      AdminForm
    }
  })
  export default class NestForm extends Vue {
    @Model('change', { type: Array, default: () => [] }) value;
    @Prop({ type: Array, default: () => [] }) columns;
    @Prop({ type: [String, Number], default: 'id' }) destroyTrackBy; // 根据判断数据中有没有trackBy字段，删除后添加_destroy标识
    @Prop({ type: String, default: '添加' }) addButtonText;

    FORM_REF_NAME = 'form_ref';

    get formGroup() {
      return this.value.filter(item => !item._destroy);
    }

    mounted() {
      this.syncSourceFormRefs();
    }

    syncSourceFormRefs() {
      this.$emit('refsChange', this.$refs[this.FORM_REF_NAME])
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
