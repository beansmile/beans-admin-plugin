<template>
  <router-link :to="to" :replace="replace" v-if="show">
    <slot />
  </router-link>
  <!-- 无权限时显示节点，不能操作 -->
  <div v-else style="display: inline-block;"><slot /></div>
</template>

<script>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { permissionService } from '../services';
import _ from 'lodash';

@Component
export default class CRouterLink extends Vue {
  @Prop([Object, String]) to;
  @Prop(Boolean) replace;

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
