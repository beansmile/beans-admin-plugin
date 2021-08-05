<script>
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import _ from 'lodash';

// TODO: IOS下select组件有很多问题

@Component
export default class Select extends Vue {
  @Prop(Function) xRemoteSearch;
  @Prop(Function) xRemotePreload;
  @Prop(Object) xRemote;
  @Prop(Array) options;
  @Prop(Boolean) multiple;
  @Prop(Number) multipleLimit;
  @Prop(Boolean) filterable;
  @Prop(String) placeholder;
  @Prop(Boolean) disabled;
  @Prop(Boolean) clearable;
  @Prop(Boolean) allowCreate;
  @Prop(Boolean) defaultFirstOption;

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
        'remote-method': keyword => search(keyword)
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
    this.$emit('change', this.value);
  }

  get computedOptions() {
    // 分组select不去重，不合并
    const isGroupOption = _.get(this.localOptions, '0.options.length', 0) > 0 || _.get(this.options, '0.options.length', 0) > 0;
    if (isGroupOption) {
      return this.localOptions.length ? this.localOptions : this.options || [];
    }
    return _.uniqBy((this.localOptions || []).concat(this.options || []), 'value');
  }

  renderOptions() {
    const isGroup = this.computedOptions.length && this.computedOptions[0].options && this.computedOptions[0].options.length

    if (isGroup) {
      return this.computedOptions.map(group => {
        return (
          <el-option-group key={group.label} label={group.label}>
            {
              group.options.map(option => <el-option props={option} key={option.value} />)
            }
          </el-option-group>
        )
      })
    } else {
      return this.computedOptions.map(option => <el-option props={option} key={option.value} />)
    }
  }

  // 移动端键盘弹不出来
  // https://github.com/ElemeFE/element/issues/12742
  cancalReadOnly(onOff) {
    this.$nextTick(() => {
      if (!onOff) {
        const { select } = this.$refs;
        const input = select.$el.querySelector('.el-input__inner');
        input.removeAttribute('readonly');
      }
    });
  }

  render() {
    return (
      <el-select
        ref="select"
        on={{
          'hook:mounted': this.cancalReadOnly,
          'visible-change': this.cancalReadOnly,
        }}
        props={{ ...this.$props, ...this.$attrs, value: this.value, ...this.localProps }}
        onChange={val => this.$emit('change', val)}
      >
        {
          this.renderOptions()
        }
      </el-select>
    )
  }
}
</script>
