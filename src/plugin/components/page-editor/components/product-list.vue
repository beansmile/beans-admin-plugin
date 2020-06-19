<template>
  <div class="c-product-list">

    <div class="list-title">{{ name }}</div>

    <ControlBox :title="$t('pageEditor.商品列表')" :visible="showController" @close="$emit('close')">
      <el-form @submit.native.prevent>
        <el-form-item :label="$t('pageEditor.选择商品列表')">
          <c-select :value="id" :options="selectOptions" @change="handleChange" />
        </el-form-item>
        <el-form-item :label="$t('pageEditor.是否横向展示')">
          <el-switch :value="value.config.scrollX" @change="handleSwitchChange" />
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
  export default class ProductList extends Vue {
    @Model('change', { type: Object, default: () => ({
      data: [
        {
          id: ''
        }
      ],
      config: {}
    }) }) value;
    @Prop(Boolean) showController;
    @Prop(Object) data;

    get id() {
      return this.value.data[0].id;
    }

    get productList() {
      return _.get(this.data, 'productList') || [];
    }

    get selectOptions() {
      return this.productList.map(({ id, title }) => ({ value: id, label: title }))
    }

    get name() {
      return _.get(this.productList.find(item => item.id === this.id), 'title');
    }

    mounted() {
      this.syncChange();
    }

    syncChange(value) {
      this.$emit('change', value || this.value);
    }

    handleSwitchChange(val) {
      const value = _.cloneDeep(this.value);
      _.set(value.config, 'scrollX', val);
      this.syncChange(value);
    }

    handleChange(val) {
      const value = _.cloneDeep(this.value);
      _.set(value.data[0], 'id', val);
      this.syncChange(value);
    }
  }
</script>

<style lang="scss" scoped>
  .list-title {
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
</style>
