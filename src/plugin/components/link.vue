<template>
  <router-link :to="to" v-bind="$attrs" v-if="hasPermission">
    <slot />
  </router-link>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';
  import { abilityService } from '../services';
  import pluralize from 'pluralize';

  @Component
  export default class Link extends Vue {
    @Prop([Object, Array]) can;
    @Prop([Object, String]) to;
    @Prop(Object) value;

    get hasPermission() {
      if (this.can) {
        return this.checkCanByCanProp(this.can);
      }
      const router = this.$router;
      const { route } = router.resolve(this.to);
      const can = _.get(route, 'meta.can');
      if (can) {
        return this.checkCanByCanProp(can);
      }
      return this.checkCanByRouteName(route.name)
    }

    checkCanByRouteName(routeName) {
      const [subject, action] = routeName.split('.');
      const actionMap = {
        'index': 'read',
        'show': 'read',
        'new': 'create',
        'edit': 'update'
      }
      if (!actionMap[action]) {
        return true;
      }
      const permissionAction = actionMap[action];
      const permissionSubject = _.upperFirst(pluralize.singular(_.camelCase(subject)));
      return abilityService.can({ action: permissionAction, subject: permissionSubject, value: this.value });
    }

    checkCanByCanProp(can) {
      return abilityService.can(can);
    }
  }
</script>
