<template>
  <div class="admin-sku-editor">
    <div style="margin-bottom: 20px" v-if="!propertyDisabled">
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
          :disabled="propertyDisabled"
        >
          <el-option v-for="item in localSkuProperties" :key="item.value" :label="item.text" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item
        v-for="property in localSkuPropertiesShown"
        :key="property.text"
      >
        <template v-slot:label>
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
          :data-values="propertySelected[property.value]"
          class="property-select"
        >
          <el-option
            v-for="item in property.children"
            :key="item.text"
            :label="item.text"
            :value="item.value"
            :disabled="isPropertyValueDisabed(item.value)"
          >
            <el-button style="margin-right: 10px" size="mini" icon="el-icon-edit" circle @click.stop="handleEditPropertyValueText(item.value, item.text)"></el-button>
            <span>{{ item.text }}</span>
          </el-option>
        </el-select>
        <el-button style="margin-left: 10px" size="mini" icon="el-icon-plus" circle @click="handleAddPropertyValue(property.value, property.text)"></el-button>
      </el-form-item>
    </el-form>

    <AdminTable
      :columns="tableColumns"
      :value="value"
      border
      :height="null"
    />

  </div>
</template>

<script>
  import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';
  import _ from 'lodash';
  import AdminTable from './table';
  import ColumnRender from './column-render';

  @Component({
    components: {
      AdminTable
    }
  })
  export default class SkuEditor extends Vue {
    @Prop(Boolean) propertyDisabled; // 禁止添加修改规格
    @Prop({ type: Array, default: () => [] }) skuProperties;
    @Prop({ type: Array, default: () => [] }) skuColumns;
    @Model('change', { type: Array, default: () => [] }) value;

    propertySelected = {};
    shownProperty = []; // 显示在外面的规格

    // 判断属性能不能被删除
    // 已经保存到后端的sku属性(sku有id了)不能删除
    get propertyValuesDisabed() {
      return _.flattenDeep(
        this.value
          .filter(item => item.id)
          .map(item => item.properties)
          .map(item => item.split(';').map(deepItem => String(deepItem.split(':')[1])))
      );
    }

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

    get tableColumns() {
      const propertyColumn = {
        prop: 'properties',
        label: '规格',
        renderCell: (h, { props: { scope: { row } } }) => {
          return <span>{row.properties.split(';').map(this.getPropertyText).join('、')}</span>;
        }
      }
      const columns = this.skuColumns.map(item => ({
        ...item,
        renderCell: (h, context) => {
          return <ColumnRender
            renderCell={item.renderCell}
            value={context.props.value}
            onChange={val => this.handleSkuChange(context.props.scope.$index, item.prop, val)}
            onInput={val => this.handleSkuChange(context.props.scope.$index, item.prop, val)}
          />
        }
      }))
      return [propertyColumn].concat(columns);
    }

    mounted() {
      this.propertySelected = this.initPropertySelected(this.value);
      const shownProperty = [];
      _.forEach(this.propertySelected, (val, key) => {
        if (val.length) {
          shownProperty.push(key);
        }
      });
      this.shownProperty = shownProperty;
    }

    isPropertyValueDisabed(value) {
      return this.propertyValuesDisabed.includes(String(value));
    }

    handleRemoveShownProperty(val) {
      this.$set(this.propertySelected, val, []);
      this.onPropertySelected();
    }

    handleSkuChange($index, prop, value) {
      const skus = _.cloneDeep(this.value);
      skus[$index][prop] = value;
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

    // 去掉后台已保存的sku peoperties value 的删除icon
    async handleCheckSelectTag() {
      const disabledValues = this.propertyValuesDisabed;
      const allSelect = this.$el.querySelectorAll('.property-select');
      allSelect.forEach(oSelect => {
        const values = oSelect.dataset.values ? oSelect.dataset.values.split(',') : [];
        const closeTags = oSelect.querySelectorAll('.el-tag__close');
        values.forEach((value, index) => {
          const itemDisabled = !!disabledValues.find(disabledValue => String(disabledValue) === String(value));
          closeTags[index].dataset.disabled = itemDisabled;
        });
      });
    }

    @Watch('value.length', { immediate: true })
    async onValueChange(valueLen) {
      if (valueLen) {
        // FIXME 只能先这样确定dom已经渲染完了
        await this.$nextTick();
        this.handleCheckSelectTag();
        setTimeout(() => this.handleCheckSelectTag(), 300);
      }
    }

  }
</script>

<style lang="scss">
  .el-tag__close[data-disabled="true"] {
    display: none;
  }
</style>
