<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import moment from 'moment';

@Component
export default class AdminMoment extends Vue {
  @Prop({ type: [String, Number, Object, Date] }) value;
  @Prop({ type: String, default: 'YYYY-MM-DD' }) format;

  render() {
    if (this.value) {
      return <span>{moment(this.value).format(this.format)}</span>;
    }
    return null;
  }
}
</script>
