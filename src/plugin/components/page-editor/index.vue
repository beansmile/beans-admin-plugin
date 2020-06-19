<script>
  import { Vue, Component, Prop, Model } from 'vue-property-decorator';
  import uuid from 'uuid/v4';
  import _ from 'lodash';
  import draggable from 'vuedraggable';
  import defaultComponents from './components';
  import { arrayMove } from '../../utils';
  import './devices.css';

  @Component
  export default class PageEditor extends Vue {
    @Model('change', { type: Array, default: () => [] }) value;
    @Prop({ type: Array, default: () => [] }) customComponents;
    @Prop({ type: Array, default: () => [] }) useComponents;
    @Prop({ type: Object, default: () => ({}) }) data;

    currentKey = '';

    get renderComponents() {
      // 组件name不能重复
      const useedDefaultComponents = this.useComponents.length ? defaultComponents.filter(item => this.useComponents.includes(item.name)) : defaultComponents;
      return _.uniqBy(useedDefaultComponents.concat(this.customComponents), 'name');
    }

    handleFocusComponent(key) {
      this.currentKey = key;
    }

    handleDelete(e, $index) {
      e.stopPropagation();
      const value = _.cloneDeep(this.value);
      value.splice($index, 1);
      this.$emit('change', value);
    }

    handleUp(e, $index) {
      e.stopPropagation();
      this.$emit('change', arrayMove(this.value, $index - 1, $index));
    }

    handleDown(e, $index) {
      e.stopPropagation();
      this.$emit('change', arrayMove(this.value, $index, $index + 1));
    }

    handleSave() {
      this.$emit('submit', this.value);
    }

    handleComponentDataChange(data, index) {
      const value = _.cloneDeep(this.value);
      _.set(value[index], 'data', data);
      this.$emit('change', value);
    }

    renderComponent(row, index) {
      const component = _.get(this.renderComponents.find(item => item.name === row.name), 'component');
      if (!component) {
        return null;
      }
      return <component
        value={row.data}
        data={this.data}
        show-controller={this.currentKey === row.key}
        onClose={() => this.currentKey = ''}
        onChange={e => this.handleComponentDataChange(e, index)}
      />
    }

    handleMove({ oldIndex, newIndex }) {
      if (oldIndex !== newIndex) {
        this.$emit('change', arrayMove(this.value, oldIndex, newIndex));
      }
    }

    async handleAddByClick(component) {
      this.handleAdd(component);
      await this.$nextTick();
      const oDraggableContent = _.get(this.$refs.draggableContent, '$el');
      if (oDraggableContent) {
        oDraggableContent.scrollTop = 99999;
      }
    }

    handleAdd({ component, title, name }, index = this.value.length) {
      const newComponent = {
        component,
        name,
        title,
        key: uuid()
      }

      const value = _.cloneDeep(this.value);
      value.splice(index, 0, newComponent);
      this.$emit('change', value);
      this.currentKey = newComponent.key;
    }

    handleChange(e) {
      const { moved, added } = e;
      if (moved) {
        this.handleMove(moved)
      }
      if (added) {
        this.handleAdd(added.element, added.newIndex)
      }
    }

    render() {
      return (
        <div class="c-page-editor">

          <portal-target name="page-editor" multiple>
          </portal-target>

          <div class="page-content">
            <div class="box-components">
              <h2>{this.$t('选择模块')}</h2>
              <draggable
                class="content"
                sort={false}
                group={{ name: 'component', pull: 'clone', put: false }}
                value={this.renderComponents}
              >
                {
                  this.renderComponents.map(item => (
                    <el-button size="medium" key={item.name} icon={item.icon} class="item" onClick={() => this.handleAddByClick(item)}>
                      {this.$t(item.title)}
                    </el-button>
                  ))
                }
              </draggable>
            </div>

            <div class="box-preview">
              <div class="marvel-device iphone5s gold">
                <div class="top-bar"></div>
                <div class="sleep"></div>
                <div class="volume"></div>
                <div class="camera"></div>
                <div class="sensor"></div>
                <div class="speaker"></div>
                <div class="screen">
                  <draggable
                    class="device-content"
                    value={this.value}
                    group="component"
                    onChange={this.handleChange}
                    ref="draggableContent"
                  >
                    {
                      this.value.map((row, index) => (
                        <div
                          key={row.key}
                          class={`item-component ${this.currentKey === row.key && 'active'}`}
                          onClick={() => this.handleFocusComponent(row.key)}
                        >
                          <div class="box-control">
                            <i>{this.$t(row.title)}</i>
                            { index - 1 >= 0 && <i class="el-icon-arrow-up" onClick={e => this.handleUp(e, index)} /> }
                            { index + 1 < this.value.length && <i class="el-icon-arrow-down" onClick={e => this.handleDown(e, index)} /> }
                            <i class="el-icon-delete" onClick={e => this.handleDelete(e, index)} />
                          </div>
                          {this.renderComponent(row, index)}
                        </div>
                      ))
                    }
                  </draggable>
                </div>
                <div class="home"></div>
                <div class="bottom-bar"></div>
              </div>
              <el-button size="medium" class="btn-save" type="primary" onClick={this.handleSave}>{this.$t('保存')}</el-button>
            </div>
          </div>
        </div>
      )
    }
  }
</script>
