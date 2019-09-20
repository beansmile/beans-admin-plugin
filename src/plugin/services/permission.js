import { fly } from '../utils';
import _ from 'lodash';
import Vue from 'vue';

class PermissionService {
  PERMISSION_STORAGE_KEY = 'permissionMap';
  permissionMap = Vue.observable({});
  usePermission = false;

  getPermissionMapFromStorage() {
    return JSON.parse(window.sessionStorage.getItem(this.PERMISSION_STORAGE_KEY));
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
    const { request_url } = Vue.appConfig.permission;
    if (request_url) {
      this.usePermission = true;
      const permissionMap = this.getPermissionMapFromStorage();
      if (permissionMap) {
        return this.permissionMap = permissionMap;
      }
      const { abilities } = await fly.get(request_url);
      this.savePermissionMapToStorage(abilities);
      return this.permissionMap = abilities;
    }
  }

  destroyPermission() {
    this.permissionMap = {};
    this.removePermissionMapToStorage();
  }

  hasPermission(permissionFlag) {
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
