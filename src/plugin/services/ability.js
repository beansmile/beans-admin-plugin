import { Ability } from '@casl/ability';
import _ from 'lodash';

function createSubject(name, value = {}) {
  return new class {
    constructor() {
      Object.assign(this, value);
      this.constructor.modelName = name;
    }
  }
}

class AbilityService {
  $rules = [];
  ability = new Ability([]);

  set rules(rules) {
    this.$rules = rules;
    this.ability.update(rules);
  }

  can(rules) {
    if (!rules) {
      return true;
    }
    return _.flatten([rules])
      .every(
        ({ action, subject, field, value }) => this.ability.can(action, _.isEmpty(value) ? subject : createSubject(subject, value), field)
      );
  }
}

export const abilityService = new AbilityService();
