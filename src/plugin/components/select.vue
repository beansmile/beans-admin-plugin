<script>
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import _ from 'lodash';

@Component
export default class Select extends Vue {
  @Prop(Function) xRemoteSearch;
  @Prop(Function) xRemotePreload;
  @Prop(Object) xRemote;
  @Prop(Array) options;
  @Model('change', { type: [String, Number, Object, Array, Boolean], default: '' }) value;

  localOptions = []
  localProps = {}

  async mounted() {
    if (this.xRemotePreload) {
      this.localOptions = await this.xRemotePreload();
    }

    if (this.xRemoteSearch) {
      const search = _.debounce(async (keyword) => this.localOptions = await this.xRemoteSearch(keyword), 500);
      const remoteObj = {
        remote: true,
        filterable: true,
        'remote-method': keyword => keyword && search(keyword)
      }
      this.localProps = Object.assign({}, remoteObj);
    }

    // TODO 兼容之前的xRemote
    if (this.xRemote) {
      const { strategy, remoteMethod } = this.xRemote || {};
      if (strategy) {
        if (strategy === 'search') {
          const search = _.debounce(async (keyword) => this.localOptions = await remoteMethod(keyword), 500);
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
  }

  get computedOptions() {
    const options = (this.options || []).concat(this.localOptions || []);
    return _.uniqBy(options, 'value');
  }

  renderOptions() {
    const isGroup = this.computedOptions.length && this.computedOptions[0].options && this.computedOptions[0].options.length

    if (isGroup) {
      return this.computedOptions.map(group => {
        return (
          <el-option-group key={group.label} label={group.label}>
            {
              group.options.map(option => <el-option label={option.label} value={option.value} key={option.value} />)
            }
          </el-option-group>
        )
      })
    } else {
      return this.computedOptions.map(option => <el-option label={option.label} value={option.value} key={option.value} />)
    }
  }

  render() {
    return (
      <el-select props={{ value: this.value, ...this.$attrs, ...this.localProps }} onChange={val => this.$emit('change', val)}>
        {
          this.renderOptions()
        }
      </el-select>
    )
  }
}
</script>
