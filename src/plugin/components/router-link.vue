<template>
  <router-link :to="to" :replace="replace" v-if="show">
    <slot />
  </router-link>
  <div v-else-if="!show && keepNode" class="link-no-permission-wrap"><slot /></div>
</template>

<script>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { permissionService } from '../services';
import _ from 'lodash';

@Component
export default class CRouterLink extends Vue {
  @Prop([Object, String]) to;
  @Prop(Boolean) replace;
  @Prop({ type: Boolean, default: true }) keepNode; // 没权限时保留节点

  show = false;

  @Watch('to', { immediate: true })
  onLocationChange(location) {
    const router = Vue.appRouter;
    if (location) {
      const { route } = router.resolve(this.to);
      this.show = permissionService.hasPermission(_.get(route, 'meta.permission'));
    }
  }

}
</script>
