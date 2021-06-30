<template>
  <div class="admin-attach-dir" v-if="abilityMap.read">
    <el-cascader
      :options="dirs"
      :value="value"
      filterable
      clearable
      :props="{
        checkStrictly: true,
        emitPath: false,
        value: 'path',
        label: 'name'
      }"
      @change="$emit('change', $event)"
      v-on="$listeners"
      v-bind="$attrs"
    >
      <template slot-scope="{ node, data }">
        <div class="admin-attach-dir">
          <span>{{ data.name }}</span>
          <el-dropdown @command="handleCommand($event, data, node)" v-if="abilityMap.create || abilityMap.update || abilityMap.destroy">
            <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="abilityMap.create" command="create">新建子文件夹</el-dropdown-item>
              <el-dropdown-item v-if="abilityMap.update" command="edit">编辑</el-dropdown-item>
              <el-dropdown-item v-if="abilityMap.destroy" command="delete">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </template>
    </el-cascader>
    <el-popover content="新建根目录文件夹" trigger="hover" v-if="abilityMap.create">
      <el-button slot="reference" class="btn-create-root" circle icon="el-icon-plus" @click="handleCreateChild()"></el-button>
    </el-popover>
  </div>
  <div v-else>
    <el-input type="text" disabled placeholder="无文件夹访问权限" />
  </div>
</template>

<script>
import { Vue, Component, Model, Prop } from 'vue-property-decorator';
import _ from 'lodash';
import { abilityService } from '../services';

const state = Vue.observable({ dirs: [] })

@Component
export default class AttachDir extends Vue {
  @Model('change', { type: String }) value;
  @Prop(Object) ability;
  @Prop(String) apiPath;

  get dirs() {
    return state.dirs;
  }

  get abilityMap() {
    const ability = this.ability || _.get(this, '$vadminConfig.attachDir.ability');
    if (!ability) {
      return {
        read: true,
        create: true,
        destroy: true,
        update: true
      }
    }
    return _.mapValues(ability, val => abilityService.can(val));
  }

  get requestUrl() {
    return this.apiPath || _.get(this, '$vadminConfig.attachDir.apiPath');
  }

  mounted() {
    if (this.abilityMap.read) {
      this.fetchData();
    }
  }

  async fetchData() {
    const data = await this.$request.get(this.requestUrl, { params: { descs: 'id' } });
    state.dirs = data;
  }

  handleCommand(command, data, node) {
    if (command === 'create') {
      this.handleCreateChild(data, node);
    } else if (command === 'edit') {
      this.handleEdit(data, node);
    } else if (command === 'delete') {
      this.handleDelete(data, node);
    }
  }

  async handleCreateChild(data, node) {
    const { value } = await this.$prompt('请输入文件夹名称', '新建文件夹');
    if (value) {
      const child = await this.$request.post(this.requestUrl, {
        parentPath: data ? data.path : '/',
        name: value
      });
      if (!data) {
        state.dirs.unshift(child);
      } else {
        const parent = node.path.reduce((accumulator, currentValue) => {
          return (accumulator.children || []).find(item => item.path === currentValue);
        }, { children: state.dirs });
        if (parent.children && parent.children.length) {
          parent.children.unshift(child);
        } else {
          this.$set(parent, 'children', [child]);
        }
      }
    }
  }

  async handleEdit(data, node) {
    const { value } = await this.$prompt('请输入文件夹名称', '修改文件夹', { inputPlaceholder: data.name });
    if (value) {
      await this.$request.put(`${this.requestUrl}/${data.id}`, { name: value });
      const nodeData = node.path.reduce((accumulator, currentValue) => {
        return (accumulator.children || []).find(item => item.path === currentValue);
      }, { children: state.dirs });
      nodeData.name = value;
    }
  }

  async handleDelete(data, node) {
    await this.$confirm(`此操作将永久删除该文件夹 - “${data.name}”, 是否继续?`, '提示');
    await this.$request.delete(`${this.requestUrl}/${data.id}`);
    const children = node.path.slice(0, -1).reduce((accumulator, currentValue) => {
      return _.get(accumulator.find(item => item.path === currentValue), 'children') || [];
    }, state.dirs);
    const index = children.findIndex(item => item.id === data.id);
    children.splice(index, 1);
  }

}
</script>
