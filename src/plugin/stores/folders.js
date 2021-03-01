import Vue from 'vue'
import { SimpleStore } from './simple-store';
import _ from 'lodash'

class FoldersStore extends SimpleStore {
  chilren = {}
  data = []

  fetch() {
    // TODO：内置获取文件夹请求
    return []
  }

  async fetchData(parentId, node) {
    const fetchFolders = _.get(Vue.prototype, '$vadminConfig.folder.onFetchFolders');
    // data 需要是 <el-cascader> 组件 options 字段对应格式
    // https://element.eleme.cn/#/zh-CN/component/cascader#cascader-attributes
    const data = await (fetchFolders ? fetchFolders(parentId, node) : this.fetch());
    if (parentId) {
      Vue.set(this.chilren, parentId, data)
      const parent = this.findByPath(_.get(node, 'path'))
      parent && Vue.set(parent, 'children', data)
    } else {
      // 如果是请求根目录，直接复制给data，并且标记请求状态
      this.fetching({})
      this.data = data
    }
    return data;
  }

  tryFetchData(node = {}) {
    const parentId = node.value
    if (!parentId) {
      return this.isFulfilled ? this.data : this.fetchData(parentId, node)
    }
    return this.chilren[parentId] || this.fetchData(parentId, node)
  }

  findByPath(path = []) {
    let parent = { children: this.data };
    _.forEach(path, item => {
      parent = _.find(parent.children, ['value', item])
    })
    if (parent.value === path[path.length - 1]) {
      return parent
    }
  }

  async createFolder({ parentId, folderName, path }) {
    const createFolder = _.get(Vue.prototype, '$vadminConfig.folder.onCreateFolder');
    if (createFolder) {
      await createFolder({ parentId, folderName, path })
    } else {
      // TODO: 内置新建请求
    }
    // 创建后，重新获取一下新的数据
    await this.fetchData(parentId, { path })
  }
}

export const foldersStore = FoldersStore.create();
