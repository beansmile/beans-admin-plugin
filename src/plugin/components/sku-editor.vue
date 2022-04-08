<template>
  <div class="c-sku-editor">
    <h4 class="page-header">{{ title }}</h4>

    <div style="margin-bottom: 20px">
      <el-button @click="handleAddProperty" type="primary">新建规格</el-button>
    </div>

    <el-form label-position="right" label-width="auto">

      <el-form-item label="选择使用规格">
        <el-select
          v-model="shownProperty"
          multiple
          filterable
          default-first-option
          @remove-tag="handleRemoveShownProperty"
        >
          <el-option v-for="item in localSkuProperties" :key="item.value" :label="item.text" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item
        v-for="property in localSkuPropertiesShown"
        :key="property.text"
      >
        <template v-slot:label v-if="!disableEditPropertyText">
          <div>
            {{ property.text }}
            <el-button style="margin-left: 10px" size="mini" icon="el-icon-edit" circle @click="handleEditPropertyText(property.value, property.text)"></el-button>
          </div>
        </template>
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
            <el-button style="margin-right: 10px" size="mini" icon="el-icon-edit" circle @click.stop="handleEditPropertyValueText(item.value, item.text)"></el-button>
            <span>{{ item.text }}</span>
          </el-option>
        </el-select>
        <el-button style="margin-left: 10px" size="mini" icon="el-icon-plus" circle @click="handleAddPropertyValue(property.value, property.text)"></el-button>
      </el-form-item>
    </el-form>

    <div class="table-container">
      <div class="table">
        <div class="table-header">
          <div class="item">规格</div>
          <div class="item" :style="{ width: getWidth(item.width) }" v-for="item in skuColumns" :key="item.label">{{ item.label }}</div>
        </div>
        <div class="table-body">
          <template v-for="(row, rowIndex) in value">
            <div class="table-row" :key="rowIndex">
              <div class="item">{{ getPropertiesText(row) }}</div>
              <div class="item" :style="{ width: getWidth(column.width) }" v-for="(column, index) in skuColumns" :key="column.prop">
                <c-source-form-item
                  :in-form="false"
                  :column="skuColumns[index]"
                  :value="row"
                  @change="handleSkuChange(rowIndex, column.prop, $event)"
                />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { Vue, Component, Prop, Model } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class SkuEditor extends Vue {
    @Prop({ type: String, default: 'sku信息' }) title;
    @Prop({ type: Array, default: () => [] }) skuProperties;
    @Prop({ type: Array, default: () => [] }) skuColumns;
    @Model('change', { type: Array, default: () => [] }) value;
    @Prop(Boolean) disableEditPropertyText;

    propertySelected = {};
    shownProperty = []; // 显示在外面的规格

    get localSkuProperties() {
      return this.skuProperties.map(item => {
        return {
          ...item,
          value: String(item.value),
          children: item.children.map(child => ({ ...child, value: String(child.value) }))
        }
      });
    }

    get localSkuPropertiesShown() {
      return this.localSkuProperties.filter(item => this.shownProperty.includes(item.value));
    }

    getWidth(width) {
      return Number(width) ? `${width}px` : width;
    }

    getPropertiesText(row) {
      return row.properties.split(';').map(this.getPropertyText).join('、');
    }

    mounted() {
      if (this.value.length) {
        this.propertySelected = this.initPropertySelected(this.value);
        const shownProperty = [];
        _.forEach(this.propertySelected, (val, key) => {
          if (val.length) {
            shownProperty.push(key);
          }
        })
        this.shownProperty = shownProperty;
      }
    }

    handleRemoveShownProperty(val) {
      this.$set(this.propertySelected, val, []);
      this.onPropertySelected();
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

    async handleEditPropertyText(propertyValue, valueText) {
      const { value } = await this.$prompt('请输入新名称', valueText, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      });
      if (value) {
        this.$emit('edit-property-text', { value, id: propertyValue });
      }
    }

    async handleEditPropertyValueText(propertyValue, valueText) {
      const { value } = await this.$prompt('请输入新名称', valueText, {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      });
      if (value) {
        this.$emit('edit-property-value-text', { value, id: propertyValue });
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
        selected[key] = _.uniq(values);
      });
      return selected;
    }

  }
</script>
