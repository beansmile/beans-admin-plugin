<template>
  <div class="c-sku-editor">
    <h4 class="page-header">{{ title }}</h4>

    <el-form>
      <el-form-item>
        <el-button @click="handleAddProperty" type="primary">新建规格</el-button>
      </el-form-item>

      <el-form-item
        v-for="property in localSkuProperties"
        :key="property.text"
        :label="property.text"
      >
        <el-select
          v-model="propertySelected[property.value]"
          multiple
          filterable
          default-first-option
          @change="onPropertySelected"
        >
          <el-option
            v-for="item in property.children"
            :key="item.text"
            :label="item.text"
            :value="item.value"
          >
            <el-button style="margin-right: 10px" size="mini" icon="el-icon-edit" circle @click.stop="handleEditPropertyValue(property.value, item.value, item.text)"></el-button>
            <span>{{ item.text }}</span>
          </el-option>
        </el-select>
        <el-button style="margin-left: 10px" size="mini" icon="el-icon-plus" circle @click="handleAddPropertyValue(property.value, property.text)"></el-button>
      </el-form-item>
    </el-form>

    <c-source-table
      :columns="tableColumns"
      :table="{ data: value, border: true }"
    />

  </div>
</template>

<script>
  import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class SkuEditor extends Vue {
    @Prop({ type: String, default: 'sku信息' }) title;
    @Prop({ type: Array, default: () => [] }) skuProperties;
    @Prop({ type: Array, default: () => [] }) skuColumns;
    @Model('change', { type: Array, default: () => [] }) value;

    propertySelected = {};

    get localSkuProperties() {
      return this.skuProperties.map(item => {
        return {
          ...item,
          value: String(item.value),
          children: item.children.map(child => ({ ...child, value: String(child.value) }))
        }
      })
    }

    get tableColumns() {
      const propertyColumn = {
        prop: 'properties',
        label: '规格',
        renderCell: (h, { row }) => {
          return row.properties.split(';').map(this.getPropertyText).join('、');
        }
      }
      const columns = this.skuColumns.map(item => ({
        renderCell: item.form ?
          (h, { row, $index }) => <c-source-form-item in-form={false} column={item} value={row} onChange={val => this.handleSkuChange($index, item.prop, val)} /> :
          undefined,
        ...item
      }));
      return [propertyColumn].concat(columns);
    }

    handleSkuChange($index, prop, value) {
      const skus = _.cloneDeep(this.value);
      skus[$index][prop] = value[prop];
      this.$emit('change', skus);
    }

    async handleAddProperty() {
      const { value } = await this.$prompt('请输入规格名', '新建规格', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      });
      if (value) {
        this.$emit('add-property', value);
      }
    }

    async handleAddPropertyValue(propertyCategory, propertyCategoryText) {
      const { value } = await this.$prompt('请输入规格值', propertyCategoryText, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      });
      if (value) {
        this.$emit('add-property-value', { value, id: propertyCategory });
      }
    }

    async handleEditPropertyValue(propertyCategory, propertyValue, valueText) {
      const { value } = await this.$prompt('请输入新规格', valueText, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      });
      if (value) {
        this.$emit('edit-property-value', { value, id: propertyCategory, child_id: propertyValue });
      }
    }

    getPropertyText(property) {
      const [propertyCategory, propertyValue] = property.split(':');
      const propertyItem = this.skuProperties.find(item => String(item.value) === String(propertyCategory));
      if (!propertyItem) {
        return '';
      }
      const childItem = _.get(propertyItem, 'children', []).find(item => String(item.value) === String(propertyValue));
      if (!childItem) {
        return '';
      }
      return childItem.text;
    }

    getSortedProperties(property) {
      return property.split(';').sort().join(';');
    }

    async onPropertySelected() {
      await this.$nextTick();
      const propertySelected = {};
      _.forEach(this.propertySelected, (val, key) => {
        propertySelected[key] = val.map(item => `${key}:${item}`);
      });

      const skuProperties = _.reduce(propertySelected, (accumulator, currentValue) => {
        if (!accumulator.length || !currentValue.length) {
          return currentValue.concat(accumulator);
        }
        const data = [];
        for (let i = 0; i < currentValue.length; i++) {
          for (let j = 0; j < accumulator.length; j ++) {
            data.push(`${currentValue[i]};${accumulator[j]}`);
          }
        }
        return data;
      }, []);

      const skus = skuProperties.map(properties => {
        const propertiesSorted = this.getSortedProperties(properties);
        const current = this.value.find(sku => this.getSortedProperties(sku.properties) === propertiesSorted);
        return {
          properties: propertiesSorted,
          ...current
        }
      });
      this.$emit('change', skus);
    }

    initPropertySelected(skus = []) {
      const selected = {};
      skus.forEach(({ properties }) => {
        properties.split(';').forEach(item => {
          const [propertyCategory, propertyValue] = item.split(':');
          if (selected[propertyCategory]) {
            selected[propertyCategory].push(propertyValue);
          } else {
            selected[String(propertyCategory)] = [String(propertyValue)];
          }
        });
      });
      // 去重
      _.forEach(selected, (values, key) => {
        selected[key] = _.flatten(values);
      });
      return selected;
    }

    @Watch('value', { immediate: true })
    onValueChange(val) {
      if (val) {
        if (!Object.keys(JSON.parse(JSON.stringify(this.propertySelected))).length) {
          // 只需要初始化一次
          this.propertySelected = this.initPropertySelected(val);
        }
      }
    }

  }
</script>
