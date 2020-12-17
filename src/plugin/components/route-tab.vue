<template>
  <div class="admin-route-tab">
    <NavMenu :menus="menus" disable-collapse mode="horizontal" />
    <div class="router-view">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import NavMenu from './nav-menu';

  @Component({
    components: {
      NavMenu
    }
  })
  export default class RouteTab extends Vue {
    @Prop(Array) menus;

  }
</script>
