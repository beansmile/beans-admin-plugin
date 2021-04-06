<template>
  <div>
    <el-button @click="handleOpenDialog" type="warning">{{ title }}</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      custom-class="dialog-sku-editor"
      append-to-body
      fullscreen
    >
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
            :key="property.value"
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
                :key="item.value"
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

        <!-- 关闭弹窗不触发顶部form validate -->
        <div class="table-container" v-if="dialogVisible">
          <div class="table" v-if="skus.length">
            <div class="table-header">
              <div class="item" v-for="item in tableHeaders" :key="item">{{ item }}</div>
            </div>
            <div class="table-body">
              <template v-for="(row, index) in skus">
                <AdminForm
                  class="table-row"
                  :key="index"
                  :columns="formColumns"
                  v-model="skus[index]"
                  ref="form"
                >
                  <template v-slot:action>
                    <span />
                  </template>
                </AdminForm>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';
  import _ from 'lodash';
  import AdminTable from './table';
  import AdminForm from './form';

  @Component({
    components: {
      AdminTable,
      AdminForm
    }
  })
  export default class SkuEditor extends Vue {
    @Prop({ type: String, default: '编辑SKU' }) title;
    @Prop(Boolean) propertyDisabled; // 禁止添加修改规格
    @Prop({ type: Array, default: () => [] }) skuProperties;
    @Prop({ type: Array, default: () => [] }) skuColumns;
    @Model('change', { type: Array, default: () => [] }) value;

    skus = [];
    dialogVisible = false;
    propertySelected = {};
    shownProperty = []; // 显示在外面的规格

    get propertyColumn() {
      return {
        prop: 'properties',
        label: '规格',
        renderCell: (h, { props: { scope: { row } } }) => {
          return <span>{row.properties.split(';').map(this.getPropertyText).join('、')}</span>;
        }
      }
    }

    get formColumns() {
      return [this.propertyColumn].concat(this.skuColumns).map(item => ({ ...item, label: '' }));
    }

    get tableHeaders() {
      return [this.propertyColumn].concat(this.skuColumns).map(item => item.label);
    }

    // 判断属性能不能被删除
    // 已经保存到后端的sku属性(sku有id了)不能删除
    get propertyValuesDisabed() {
      return _.flattenDeep(
        this.skus
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

    isPropertyValueDisabed(value) {
      return this.propertyValuesDisabed.includes(String(value));
    }

    handleRemoveShownProperty(val) {
      this.$set(this.propertySelected, val, []);
      this.onPropertySelected();
    }

    handleSkuChange($index, prop, value) {
      const skus = _.cloneDeep(this.skus);
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
        const current = this.skus.find(sku => this.getSortedProperties(sku.properties) === propertiesSorted);
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

    async handleOpenDialog() {
      this.dialogVisible = true;
      this.propertySelected = this.initPropertySelected(this.skus);
      const shownProperty = [];
      _.forEach(this.propertySelected, (val, key) => {
        if (val.length) {
          shownProperty.push(key);
        }
      });
      this.shownProperty = shownProperty;
      await this.$nextTick();
      this.handleCheckSelectTag();
      setTimeout(() => this.handleCheckSelectTag(), 300);
    }

    async handleSubmit() {
      const formInstances = this.$refs.form;
      if (formInstances && formInstances.length) {
        await Promise.all(formInstances.map(item => item.handleValidateForm()));
      }
      this.dialogVisible = false;
      this.$emit('change', JSON.parse(JSON.stringify(this.skus)));
    }

    @Watch('value', { immediate: true })
    async onValueChange(value) {
      if (value) {
        this.skus = JSON.parse(JSON.stringify(value));
      }
    }
  }
</script>

<style lang="scss">
  .el-tag__close[data-disabled="true"] {
    display: none;
  }
</style>
