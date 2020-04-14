<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { permissionService } from '../services';
import _ from 'lodash';

@Component
export default class CRouterLink extends Vue {
  @Prop([Object, String]) to;
  @Prop(Boolean) replace;
  @Prop({ type: Boolean, default: true }) keepNode;

  get show() {
    const router = Vue.appRouter;
    if (this.to) {
      const { route } = router.resolve(this.to);
      return permissionService.hasPermission(_.get(route, 'meta.permission'))
    }
    return false;
  }

  showPermissionTip() {
    this.$message({
      message: this.$t('您没有权限'),
      type: 'warning'
    })
  }

  render() {
    if (this.show) {
      return <router-link to={this.to} replace={this.replace}>{this.$slots.default}</router-link>
    } else {
      if (this.keepNode) {
        return <div class="link-no-permission-wrap" onClick={() => this.showPermissionTip()}>{this.$slots.default}</div>
      }
      return null;
    }
  }

}
</script>
