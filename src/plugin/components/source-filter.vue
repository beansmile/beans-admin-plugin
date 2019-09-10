<template>
  <el-form
    inline
    v-if="filterColumns.length"
    @submit.native.prevent="onSubmit"
  >
    <c-source-form-item v-for="(item, index) in filterColumns" :column="item" v-model="formModel" :key="item.prop" :class="`item-${item.prop} item-${index}`" />

    <el-form-item>
      <el-button type="primary" native-type="submit">查询</el-button>
    </el-form-item>
    <el-form-item>
      <el-button type="default" @click="onClear">清除</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import _ from 'lodash';

@Component
export default class SourceFilter extends Vue {
  @Prop({ type: Array, default: () => [] }) filter;

  formModel = {
    _search: {
      field: '',
      value: ''
    }
  }

  mounted() {
    this.initModel();
  }

  initModel() {
    const query = _.cloneDeep(this.$route.query);
    const searchField = _.get(query, '_search.field');
    searchField && _.unset(query, searchField);
    this.formModel = Object.assign({}, this.formModel, query);
  }

  onSubmit() {
    // 空字符串不提交
    const query = _.pickBy(this.formModel, val => val !== '');
    const searchKey = _.get(query, '_search.field');
    const searchValue = _.get(query, '_search.value');
    if (searchKey && searchValue) {
      _.set(query, searchKey, searchValue);
    }
    this.$router.replace({ query: { ...query, page: 1 } });
  }

  onClear() {
    this.$router.replace({ query: {} });
  }

  get filterColumns() {
    return this.filterTransformed.map(item => ({ ...item, prop: String(item.prop) }));
  }

  get filterTransformed() {
    const searchComponents = this.filter.filter(item => _.get(item, 'form.component') === 'search');
    const filterTransformed = this.filter.filter(item => _.get(item, 'form.component') !== 'search');

    const searchOptions = searchComponents.map(item => ({
      label: item.label,
      value: item.prop
    }));
    if (searchOptions.length) {
      filterTransformed.unshift({
        prop: '_search.value',
        form: {
          component: 'input',
          props: {
            // TODO placeholder没渲染出来
            placeholder: '请输入关键字'
          }
        }
      });
      filterTransformed.unshift({
        prop: '_search.field',
        label: '搜索',
        form: {
          component: 'select',
          props: {
            options: searchOptions,
            clearable: false
          }
        }
      });
    }
    return filterTransformed;
  }

  @Watch('filterTransformed', { immediate: true })
  onFilterFormatedChange(val) {
    const searchItem = val.find(item => item.prop === '_search.field');
    const searchOptions = _.get(searchItem, 'form.props.options');
    if (searchOptions) {
      if (!_.get(this.formModel, '_search.field')) {
        _.set(this.formModel, '_search.field', searchOptions[0].value);
      }
    }
  }
}
</script>
