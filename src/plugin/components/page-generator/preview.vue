<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';
  import draggable from 'vuedraggable';

  @Component
  export default class PageEditorPreview extends Vue {
    @Prop(Boolean) showController;
    @Prop(Array) pages;
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
      const component = _.get(this.allComponents.find(item => item.name === row.name), 'component');
      if (!component) {
        return null;
      }
      return <component
        value={row.config}
        pages={this.pages}
        popupComponents={this.popupComponents}
        show-controller={this.componentIsActive(row.key)}
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
          class="device-content"
          value={this.page.components}
          group="component"
          onChange={this.handleChange}
          ref="draggableContent"
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

<style lang="scss" scoped>

  /deep/ img,
  /deep/ video {
    vertical-align: top;
  }

  .sortable-ghost {
    box-sizing: border-box;
    width: 100%;

    /deep/ &.component-button-item {
      width: 100%;
      background: rgba($primary, .2);
      font-size: 16px;
      border-radius: 0;
      border-color: none;
      display: flex;
      align-items: center;
      justify-content: center;

      /deep/ i {
        font-size: 30px;
        margin-right: 10px;
      }
    }
  }

  .item-component,
  /deep/ .item-global-component {
    position: relative;
    width: 100%;

    &.active {
      &:after {
        content: '';
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 8;
        border: 3px dashed $primary;
      }
    }

    .box-control {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 5px;
      background: rgba(0, 0, 0, .2);
      color: #fff;
      z-index: 9;
      line-height: 1.4;

      i {
        cursor: pointer;
        margin-right: 5px;
        font-style: normal;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .box-popup {
    border-top: 1px solid $border-light;
    padding: 20px;
    max-height: 300px;
    overflow: auto;

    .popup-item {
      padding: 5px 10px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid $border-light;
      margin-bottom: 10px;
      font-size: 16px;
      cursor: pointer;

      &.active {
        border-width: 2px;
        border-style: dashed;
        border-color: $primary;
      }
    }
  }
</style>
