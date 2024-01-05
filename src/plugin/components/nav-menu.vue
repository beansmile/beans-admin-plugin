<script>
  import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class BeanNavMenu extends Vue {
    @Model('change', { type: Boolean }) value;
    @Prop({ type: Array, default: () => [] }) menus;
    @Prop({ type: Boolean }) disableCollapse;
    @Prop({ type: String, default: 'vertical' }) mode;
    @Prop({ type: String, default: 'nav-menu' }) id;

    defaultActive = '';

    get ROUTE_ACTIVE_CLASS() {
      return `${this.id}-route-active`;
    }

    get ROUTE_EXACT_ACTIVE_CLASS() {
      return `${this.id}-route-exact-active`;
    }

    mounted() {
      this.handleCalcActive();
      this.menuWatcher = this.$watch('menus.length', () => this.handleCalcActive());
      this.routeWatcher = this.$watch('$route.path', async () => {
        await this.$nextTick();
        this.handleCalcActive();
      });
    }

    beforeDestroy() {
      this.menuWatcher && this.menuWatcher();
      this.routeWatcher && this.routeWatcher();
    }

    handleCalcActive() {
      // 折叠时二级菜单dom不在this.$el下面
      const exactActiveIndex = _.get(document.querySelector(`.${this.ROUTE_EXACT_ACTIVE_CLASS}`), 'dataset.index');
      const index = _.get(document.querySelector(`.${this.ROUTE_ACTIVE_CLASS}`), 'dataset.index');
      this.defaultActive = exactActiveIndex || index;
    }

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
          <router-link
            style="display: none;"
            active-class={this.ROUTE_ACTIVE_CLASS}
            exact-active-class={this.ROUTE_EXACT_ACTIVE_CLASS}
            to={item.route}
            data-index={String(index)}
          />
        </el-menu-item>
      );
    }

    render() {
      return (
        <div class="vadmin-nav-menu" data-mode={this.mode}>
          <el-menu
            router
            class="el-menu"
            collapse={this.value}
            default-active={this.defaultActive}
            mode={this.mode}
            on={this.$listeners}
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
