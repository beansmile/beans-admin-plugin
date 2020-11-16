import _ from 'lodash';

class AbilityService {
  $rules = null;

  set rules(rules) {
    this.$rules = rules;
  }

  check(rule) {
    const [subject, action] = rule.split('.');
    return _.get(this.$rules, subject, []).includes(action);
  }

  // admin_users.index
  routeNameCan(routeName = '') {
    const [subject, action] = routeName.split('.');
    const actionMap = {
      'index': 'read',
      'show': 'read',
      'new': 'create',
      'edit': 'update'
    }
    const abilityAction = actionMap[action] || 'read';
    return this.can(`${subject}.${abilityAction}`);
  }

  // admin_users.read || [admin_users.read]
  can(rules) {
    if (!this.$rules) {
      return true;
    }
    return _.flatten([rules]).every(rule => this.check(rule));
  }
}

export const abilityService = new AbilityService();
