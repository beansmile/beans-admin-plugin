<script>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class VNode extends Vue {
  @Prop(Function) renderNode;

  render() {
    return this.renderNode && this.renderNode(this.$createElement);
  }
}
</script>
