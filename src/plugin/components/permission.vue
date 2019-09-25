<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { permissionService } from '../services';

  @Component
  export default class Permission extends Vue {
    @Prop([String, Array]) permission;

    render() {
      if (permissionService.hasPermission(this.permission)) {
        return this.$slots.default;
      }
      return null;
    }
  }
</script>
