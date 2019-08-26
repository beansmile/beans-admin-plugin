<script>
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import { Vue, Component, Prop } from 'vue-property-decorator';

const defaultOptions = {
  tooltip: {
    trigger: 'axis'
  },
  color: ['#eca117', '#5d93e4', '#4fc08d', '#827973', '#dc7272', '#d784dc', '#dadc45', '#9d93d2', '#513d82']
}

@Component
export default class Chart extends Vue {
  @Prop(Object) options;

  render() {
    const options = Object.assign({}, defaultOptions, this.options)
    return <ECharts options={options} />
  }
}
</script>
