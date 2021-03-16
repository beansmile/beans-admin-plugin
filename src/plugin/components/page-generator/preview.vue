<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';
  import draggable from 'vuedraggable';

  @Component
  export default class PageEditorPreview extends Vue {
    @Prop(Boolean) showController;
    @Prop({ type: [Array, Function], default: () => [] }) pages;
    @Prop(Object) page;
    @Prop(String) activeKey;
    @Prop(Array) allComponents;

    get popupComponents() {
      return _.get(this.page, 'components', []).filter(item => item.name === 'popup');
    }

    handleFocusComponent(key) {
      this.$emit('toggle-active-component-key', key);
    }

    handleDelete(e, item) {
      e.stopPropagation();
      this.$emit('delete-component', item);
      if (item.key === this.activeKey) {
        this.$emit('toggle-active-component-key', '');
      }
    }

    handleComponentDataChange(item, value) {
      this.$emit('update-component', item, 'config', value);
    }

    handleMove({ oldIndex, newIndex }) {
      this.$emit('update-component-position', oldIndex, newIndex);
    }

    handleAdd(componentItem, index) {
      this.$emit('add-component', componentItem, index);
    }

    handleChange(e) {
      const { moved, added } = e;
      if (moved) {
        this.handleMove(moved);
      }
      if (added) {
        this.handleAdd(added.element, added.newIndex);
      }
    }

    renderPopupComponents() {
      if (this.popupComponents.length) {
        return (
          <portal to="page-editor-popup-controller">
            <div class="box-popup">
              {
                this.popupComponents.map(item => (
                  <div
                    class={`popup-item ${this.componentIsActive(item.key) && 'active'}`}
                    key={item.key}
                    onClick={() => this.handleFocusComponent(item.key)}
                  >
                    <span>{_.get(item.config, 'name')}</span>
                    <div>
                      <el-button circle icon="el-icon-delete" onClick={e => this.handleDelete(e, item)}></el-button>
                    </div>
                  </div>
                ))
              }
            </div>
          </portal>
        )
      }
    }

    renderComponent(row) {
      const item = this.allComponents.find(item => item.name === row.name);
      const component = _.get(item, 'component');
      const props = _.get(item, 'props');
      if (!component) {
        return null;
      }
      return <component
        value={row.config}
        pages={this.pages}
        popupComponents={this.popupComponents}
        show-controller={this.componentIsActive(row.key)}
        props={props}
        onChange={e => this.handleComponentDataChange(row, e)}
      />
    }

    componentIsActive(key) {
      return this.showController && this.activeKey === key;
    }

    renderSlots() {
      const { default: defaultSlot } = this.$scopedSlots;
      if (defaultSlot) {
        return defaultSlot();
      }
    }

    render() {
      return (
        <draggable
          style="height: 100%;"
          class="admin-page-editor-preview device-content"
          value={this.page.components}
          group="component"
          onChange={this.handleChange}
          draggable=".item-component"
        >
          {
            _.get(this.page, 'components', []).map((row, index) => (
              row.name === 'popup' ? this.renderComponent(row, index) : (
                <div
                  key={row.key}
                  class={`item-component ${this.componentIsActive(row.key) && 'active'}`}
                  onClick={() => this.handleFocusComponent(row.key)}
                >
                  <div class="box-control">
                    <i>{row.title}</i>
                    <i class="el-icon-delete" onClick={e => this.handleDelete(e, row)} />
                  </div>
                  {this.renderComponent(row, index)}
                </div>
              )
            ))
          }
          {this.renderSlots()}
          {this.renderPopupComponents()}
        </draggable>
      )
    }
  }
</script>
