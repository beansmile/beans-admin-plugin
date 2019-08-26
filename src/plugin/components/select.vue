<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'lodash';

@Component
export default class Select extends Vue {
  @Prop(Object) selectProps;

  localOptions = []
  localProps = {}

  async mounted() {
    const { strategy, remoteMethod } = _.get(this.selectProps, 'x-remote') || {};
    if (strategy) {
      if (strategy === 'search') {
        const search = _.debounce(async (keyword) => this.localOptions = await remoteMethod(keyword), 800);
        const remoteObj = {
          remote: true,
          filterable: true,
          'remote-method': keyword => keyword && search(keyword)
        }
        this.localProps = Object.assign({}, remoteObj);
      } else {
        // preload
        this.localOptions = await remoteMethod();
      }
    }
  }

  get options() {
    return this.localOptions.length ? this.localOptions : this.selectProps.options || [];
  }

  renderOptions() {
    const isGroup = this.options.length && this.options[0].options && this.options[0].options.length

    if (isGroup) {
      return this.options.map(group => {
        return (
          <el-option-group key={group.label} label={group.label}>
            {
              group.options.map(option => <el-option label={option.label} value={option.value} key={option.value} />)
            }
          </el-option-group>
        )
      })
    } else {
      return this.options.map(option => <el-option label={option.label} value={option.value} key={option.value} />)
    }
  }

  render() {
    return (
      <el-select props={{ ...this.selectProps, ...this.localProps }} onChange={val => this.$emit('change', val)}>
        {
          this.renderOptions()
        }
      </el-select>
    )
  }
}
</script>
