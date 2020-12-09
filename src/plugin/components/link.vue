<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';
  import { abilityService } from '../services';

  @Component
  export default class Link extends Vue {
    @Prop([String, Array]) can;
    @Prop([Object, String]) to;
    @Prop(Boolean) keepNode; // 没权限时是否也渲染slot

    get hasPermission() {
      if (this.can) {
        return abilityService.can(this.can);
      }
      const router = this.$router;
      const { route } = router.resolve(this.to);
      const can = _.get(route, 'meta.can');
      if (can) {
        return abilityService.can(can);
      }
      return abilityService.routeNameCan(route.name);
    }

    render() {
      if (this.hasPermission) {
        return <router-link to={this.to} props={this.$attrs} attrs={this.$attrs}>{this.$slots.default}</router-link>
      }
      if (this.keepNode) {
        return <span props={this.$attrs} attrs={this.$attrs}>{this.$slots.default}</span>
      }
      return null;
    }

  }
</script>
