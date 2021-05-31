<template>
  <div class="admin-nest-form">
    <template v-for="(group, index) in value">
      <div class="nest-form-group" :key="index" v-if="!group._destroy">
        <AdminForm
          v-bind="$attrs"
          :value="group"
          :columns="getColumn(group, index)"
          @change="handleGroupChange(index, $event)"
        >
          <template v-slot:header>
            <el-button class="btn-delete" type="danger" size="small" icon="el-icon-delete" @click="handleDelete(index)" circle v-if="!limitOne"></el-button>
          </template>
          <template v-slot:action>
            <span />
          </template>
        </AdminForm>
      </div>
    </template>
    <el-button class="btn-add" type="primary" size="small" @click="handleAdd" icon="el-icon-plus" v-if="!limitOne">{{ addButtonTextI18n }}</el-button>
  </div>
</template>

<script>
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';
  import AdminForm from './index';
  import _ from 'lodash';

  @Component({
    components: {
      AdminForm
    }
  })
  export default class NestForm extends Vue {
    @Model('change', { type: Array, default: () => [] }) value;
    @Prop({ type: [Array, Function], default: () => [] }) columns;
    @Prop({ type: [String, Number], default: 'id' }) destroyTrackBy; // 根据判断数据中有没有trackBy字段，删除后添加_destroy标识
    @Prop({ type: String }) addButtonText;
    @Prop({ type: Boolean }) limitOne; // 为true时不显示添加、删除按钮
    @Prop({ type: Object, default: () => ({}) }) defaultValue;

    get addButtonTextI18n() {
      return this.addButtonText || this.$t('bean.actionAdd');
    }

    getColumn(value, index) {
      if (_.isFunction(this.columns)) {
        return this.columns(value, index);
      }
      return this.columns;
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
      this.$emit('change', this.value.concat(this.defaultValue));
    }

    async handleDelete(index) {
      const value = this.getPureValue();
      if (value[index][this.destroyTrackBy]) {
        value[index] = { ...value[index], _destroy: true };
      } else {
        value.splice(index, 1);
      }
      this.$emit('change', value);
    }
  }
</script>
