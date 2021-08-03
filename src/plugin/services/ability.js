import Vue from 'vue';
import _ from 'lodash';

class AbilityService {
  _rules = null; // 原 rules
  state = Vue.observable({ $rules: null }); // 转换后的 rules

  /**
   * @param  {Object} rules { resource: ['create', 'read', 'update', 'delete'] }
   *
   * // 转换后的 $rules 格式
   * {
   *   resource.create: true
   *   resource.read: true
   *   resource.update: true
   *   resource.delete: true
   * }
   *
   */
  set rules(value) {
    this._rules = value;

    function transformRules(rules) {
      const newRules = {}
      _.map(rules, (item, key) => {
        if (typeof item === 'string') {
          newRules[item] = true
        } else if (typeof item === 'object') {
          // Array || Object
          newRules[key] = transformRules(item)
        }
      })
      return newRules
    }

    this.state.$rules = transformRules(value)
  }

  get rules() {
    return this._rules;
  }

  check(rule) {
    return _.get(this.state.$rules, rule, false)
  }

  // admin_users.index
  routeNameCan(routeName = '') {
    const [resource, action] = routeName.split('.');
    const actionMap = {
      'index': 'read',
      'show': 'read',
      'new': 'create',
      'edit': 'update'
    }
    const abilityAction = actionMap[action] || 'read';
    return this.can([resource.replace('/', '_'), abilityAction].join('.'));
  }

  // admin_users.read || [admin_users.read]
  can(rules) {
    if (!this.state.$rules) {
      return true;
    }
    return _.flatten([rules]).filter(Boolean).every(rule => this.check(rule));
  }
}

export const abilityService = new AbilityService();
