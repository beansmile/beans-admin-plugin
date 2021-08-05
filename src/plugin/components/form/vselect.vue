<template>
  <VSelect
    :value="value"
    :options="renderOptions"
    :label="labelKey"
    :placeholder="placeholder"
    :multiple="multiple"
    :disabled="disabled"
    :clearable="clearable"
    v-bind="bindProps"
    @input="handleChange"
    @open="handleOpen"
    @search="handleSearch"
    :components="{ Deselect }"
    ref="vselect"
  >
    <template #spinner>
      <i v-show="loading" class="el-icon-loading"></i>
    </template>
    <template #no-options>
      <span></span>
    </template>
    <template #open-indicator="{ attributes }">
      <i class="el-icon-arrow-down" v-bind="attributes"></i>
    </template>
  </VSelect>
</template>

<script>
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import VSelect from 'vue-select';
import _ from 'lodash';

@Component({
  components: {
    VSelect
  }
})
export default class AdminVSelect extends Vue {
  @Model('change') value;
  @Prop(Function) xRemoteSearch;
  @Prop(Function) xRemotePreload;
  @Prop({ type: Array, default: () => [] }) options;
  @Prop(Boolean) multiple;
  @Prop(Number) multipleLimit;
  @Prop(String) placeholder;
  @Prop(Boolean) disabled;
  @Prop({ type: Boolean, default: false }) clearable;
  @Prop(Boolean) allowCreate;
  @Prop({ type: String, default: 'label' }) labelKey;
  @Prop({ type: String, default: 'value' }) valueKey;

  loading = false;
  localOptions = [];
  selectedOptions = []; // 缓存已选中的option
  $get = _.get;

  get renderOptions() {
    return _.uniqBy(this.localOptions.concat(this.selectedOptions), this.valueKey);
  }

  get bindProps() {
    const props = {
      reduce: v => _.has(v, this.valueKey) ? v[this.valueKey] : v,
      ...this.$attrs,
    }
    if (_.isFunction(this.xRemoteSearch)) {
      props.filterable = false;
    }
    if (this.allowCreate) {
      Object.assign(props, {
        createOption: newOption => newOption,
        taggable: true,
        'push-tags': true
      });
    }
    if (this.multipleLimit) {
      props.selectable = () => this.value.length < this.multipleLimit;
    }
    return props;
  }

  Deselect = {
    // eslint-disable-next-line no-unused-vars
    render: h => <i class="el-icon-close"></i>
  }

  created() {
    this.searchdebounce = _.debounce(this.search, 500);
  }

  mounted() {
    this.localOptions = JSON.parse(JSON.stringify(this.options));
    this.handlePreload();
  }

  async preload() {
    if (_.isFunction(this.xRemotePreload)) {
      const res = await this.xRemotePreload();
      this.localOptions = res;
    }
  }

  async search(keyword = '') {
    const kwd = String(keyword).trim();
    if (kwd) {
      if (_.isFunction(this.xRemoteSearch)) {
        // 请求前先缓存一下已选中的options
        await this.syncSelectOptions();
        const res = await this.xRemoteSearch(kwd);
        this.localOptions = res;
      }
    }
  }

  async syncSelectOptions() {
    await this.$nextTick();
    this.selectedOptions = JSON.parse(JSON.stringify(this.$refs.vselect.selectedValue));
  }

  async handleSearch(search) {
    this.loading = true;
    try {
      await this.searchdebounce(search);
    } finally {
      this.loading = false;
    }
  }

  async handlePreload() {
    this.loading = true;
    try {
      await this.preload();
    } finally {
      this.loading = false;
    }
  }

  @Emit('change')
  handleChange(data) {
    return data;
  }
}
</script>
