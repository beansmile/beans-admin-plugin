<script>
  import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class BeanNavMenu extends Vue {
    @Model('change', { type: Boolean }) value;
    @Prop({ type: Array, default: () => [] }) menus;
    @Prop({ type: Boolean }) disableCollapse;
    @Prop({ type: Function, default: _.noop }) itemIsActive;
    defaultActive = '';

    @Emit('change')
    handleToggleCollapsed() {
      return !this.value;
    }

    renderIcon(icon) {
      if (!icon) {
        return null;
      }
      if (_.isString(icon)) {
        return <i class={icon}></i>;
      }
      if (_.isFunction(icon)) {
        return icon(this.$createElement);
      }
      return null;
    }

    renderItem(item, index) {
      if (item.children) {
        return (
          <el-submenu index={String(index)} key={String(index)}>
            <template slot="title">
              {this.renderIcon(item.icon)}
              <span slot="title">{item.title}</span>
            </template>
            {item.children.map((child, childIndex) => this.renderItem(child, `${index}-${childIndex}`))}
          </el-submenu>
        );
      }
      // 计算defaultActive
      if (this.itemIsActive(item)) {
        if (this.defaultActive !== String(index)) {
          this.defaultActive = String(index);
        }
      }

      return (
        <el-menu-item
          key={String(index)}
          index={String(index)}
          data-index={String(index)}
          route={item.route}
        >
          <template slot="title">
            <span>{item.title}</span>
          </template>
          {this.renderIcon(item.icon)}
        </el-menu-item>
      );
    }

    render() {
      return (
        <div class="vadmin-nav-menu">
          <el-menu
            router
            class="el-menu"
            collapse={this.value}
            default-active={this.defaultActive}
          >
            { this.menus.map(this.renderItem)}
          </el-menu>
          {
            !this.disableCollapse && (
              <el-button
                class="btn-collapse"
                type="text"
                icon={`el-icon-s-${this.value ? 'unfold' : 'fold'}`}
                onClick={this.handleToggleCollapsed}
              />
            )
          }
        </div>
      )
    }
  }
</script>
