<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class BeanNavMenu extends Vue {
    @Prop({ type: Array, default: () => [] }) menus;
    @Prop({ type: Boolean }) disableCollapse;
    collapsed = false;
    defaultActive = '';

    handleToggleCollapsed() {
      this.collapsed = !this.collapsed;
    }

    renderIcon(icon) {
      if (!icon) {
        return null;
      }
      if (_.isString(icon)) {
        return <i class={icon}></i>;
      }
      return <bean-component-reder component={icon} />;
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
      if (!this.defaultActive) {
        if (this.$route.name === this.$router.resolve(item.route).resolved.name) {
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
        <div class="bean-nav-menu">
          <el-menu
            router
            class="el-menu"
            collapse={this.collapsed}
            default-active={this.defaultActive}
          >
            { this.menus.map(this.renderItem)}
          </el-menu>
          {
            !this.disableCollapse && (
              <el-button
                class="btn-collapse"
                type="text"
                icon={`el-icon-s-${this.collapsed ? 'unfold' : 'fold'}`}
                onClick={this.handleToggleCollapsed}
              />
            )
          }
        </div>
      )
    }
  }
</script>
