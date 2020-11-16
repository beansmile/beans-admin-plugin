<template>
  <div>
    <el-input
      :placeholder="$t('bean.enterKeywordFiltering')"
      v-model="filterText">
    </el-input>

    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      ref="tree"
      accordion
      @check="handleChecked"
      :filter-node-method="filterNode"
      highlight-current
      :props="defaultProps">
    </el-tree>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Watch, Emit, Model } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class Permissiosns extends Vue {
    @Prop({ type: Object, default: () => ({}) }) rawData;
    @Prop({ type: Object, default: () => ({}) }) abilityI18n;
    @Model('handleChecked', { type: [Object] }) value;

    defaultProps = {
      children: 'children',
      value: '',
      label: 'label'
    }
    data = [];
    permissionsAttributes = {};

    filterText = '';
    checkedKeys = [];

    @Watch('rawData', { immediate: true })
    rawDataChange() {
      const options = [{
        id: 'all',
        label: this.$t('bean.all'),
        children: []
      }];
      const checkedKeys = [];

      this.permissionsAttributes = this.rawData;
      _.forOwn(this.rawData, (values, parentKey) => {
        const parent = {
          id: parentKey,
          label: this.abilityI18n.models[parentKey],
          children: []
        }

        _.forOwn(values, (value, subKey) => {
          const subKeyID = `${parentKey}-${subKey}`;
          // 如果没有在model中定义ability i18n，在默认的’normal‘key中去找
          const abilitiesI18n = this.abilityI18n.attributes[parentKey] ? this.abilityI18n.attributes[parentKey][subKey] : this.abilityI18n.attributes['normal'][subKey];
          parent['children'].push({
            id: subKeyID,
            label: abilitiesI18n
          })
          if (value) { checkedKeys.push(subKeyID) }
        })
        options[0].children.push(parent);
      })
      this.checkedKeys = checkedKeys;
      this.data = options;
    }

    filterNode(value, data, node) {
      if (!value) return true;
      const parentLableEqual = node.parent && node.parent.label && node.parent.label.indexOf(value) !== -1
      return data.label && data.label.indexOf(value) !== -1 || parentLableEqual;
    }

    @Watch('checkedKeys')
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys(this.checkedKeys);
    }

    @Watch('filterText')
    filterTextWatching(value) {
      this.$refs.tree.filter(value);
    }

    @Emit('handleChecked')
    handleChecked(data, checkedObj) {
      let newData = this.permissionsAttributes;
      // 有孩子节点，说明变化的是父节点，需要更改所有子节点
      // 否则是子节点，只需要改子节点的值即可
      if (data.id === 'all') {
        const checked = checkedObj.checkedKeys.includes(data.id)
        _.forOwn(newData, (values, pKey) => {
          _.forOwn(newData[pKey], (value, key) => {
            values[key] = checked;
          })
        })
      } else {
        if (data.children) {
          // 通过键是否选择判断父节点是否选择
          const checked = checkedObj.checkedKeys.includes(data.id)
          _.forOwn(newData[data.id], (value, key) => {
            newData[data.id][key] = checked;
          })
        } else {
          const keyId = data.id.split('-'); // ['admin_user', 'read']
          newData[keyId[0]][keyId[1]] = !newData[keyId[0]][keyId[1]]
        }
      }
      this.permissionsAttributes = newData;

      return newData
    }
  }
</script>
