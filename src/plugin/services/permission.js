import { fly } from '../utils';
import _ from 'lodash';
import Vue from 'vue';

class PermissionService {
  PERMISSION_STORAGE_KEY = 'permissionMap';
  permissionMap = Vue.observable({});
  usePermission = false;

  getPermissionMapFromStorage() {
    try {
      return JSON.parse(window.sessionStorage.getItem(this.PERMISSION_STORAGE_KEY));
    } catch (e) {
      return null;
    }
  }

  savePermissionMapToStorage(data) {
    window.sessionStorage.setItem(this.PERMISSION_STORAGE_KEY, JSON.stringify(data));
  }

  removePermissionMapToStorage() {
    window.sessionStorage.removeItem(this.PERMISSION_STORAGE_KEY);
  }

  get inited() {
    return !!Object.keys(this.permissionMap).length;
  }

  async init() {
    const { request_url, getPermissionMap } = Vue.appConfig.permission;
    if (request_url || _.isFunction(getPermissionMap)) {
      this.usePermission = true;
      const permissionMap = this.getPermissionMapFromStorage();
      if (permissionMap) {
        return this.permissionMap = permissionMap;
      }
      let abilities = [];
      if (getPermissionMap) {
        abilities = await getPermissionMap();
      } else {
        const data = await fly.get(request_url);
        abilities = data.abilities;
      }
      this.savePermissionMapToStorage(abilities);
      return this.permissionMap = abilities;
    }
  }

  destroyPermission() {
    this.permissionMap = {};
    this.removePermissionMapToStorage();
  }

  hasPermission(permissionFlag) {
    const { hasPermission } = Vue.appConfig.permission;
    if (_.isFunction(hasPermission)) {
      return hasPermission(permissionFlag, this.permissionMap);
    }
    if (!permissionFlag || !this.usePermission) return true;
    const needPermissions = _.flatten([permissionFlag]);
    return needPermissions
      .filter(item => {
        const [resource = '', action = ''] = item.split('.');
        return (this.permissionMap[resource] || []).includes(action);
      })
      .length === needPermissions.length;
  }
}

export const permissionService = new PermissionService;
