<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import { permissionService } from '../services';

  @Component
  export default class Permisson extends Vue {
    @Prop([String, Array]) permisson;

    render() {
      if (permissionService.hasPermission(this.permisson)) {
        return this.$slots.default;
      }
      return null;
    }
  }
</script>
