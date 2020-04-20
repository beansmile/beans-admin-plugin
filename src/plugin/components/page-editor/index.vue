<script>
  import { Vue, Component, Prop, Model } from 'vue-property-decorator';
  import uuid from 'uuid/v4';
  import _ from 'lodash';
  import draggable from 'vuedraggable';
  import defaultComponents from './components';
  import { arrayMove } from '../../utils';

  @Component
  export default class PageEditor extends Vue {
    @Model('change', { type: Array, default: () => [] }) value;
    @Prop({ type: Array, default: () => [] }) components;
    @Prop({ type: Object, default: () => ({}) }) data;

    currentKey = '';

    get renderComponents() {
      // 组件name不能重复
      return _.uniqBy(defaultComponents.concat(this.components), 'name');
    }

    handleFocusComponent(key) {
      this.currentKey = key;
    }

    handleAddComponent({ component, title, name }) {
      const newComponent = {
        component,
        name,
        title,
        key: uuid()
      }
      this.$emit('change', this.value.concat(newComponent));
      this.currentKey = newComponent.key;
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

    handleSort({ oldIndex, newIndex }) {
      if (oldIndex !== newIndex) {
        this.$emit('change', arrayMove(this.value, oldIndex, newIndex));
      }
    }

    handleSave() {
      this.$emit('submit', this.value);
    }

    handleComponentDataChange(data, index) {
      const value = _.cloneDeep(this.value);
      _.set(value[index], 'data', data);
      this.$emit('change', value);
    }

    render() {
      return (
        <div class="c-page-editor">
          <div class="box-preview">
            <draggable value={this.value} onEnd={this.handleSort}>
              {
                this.value.map((row, index) => (
                  <div
                    key={row.key}
                    class={`item-component ${this.currentKey === row.key && 'active'}`}
                    onClick={() => this.handleFocusComponent(row.key)}
                  >
                    <div class="box-control">
                      { index - 1 >= 0 && <i class="el-icon-arrow-up" onClick={e => this.handleUp(e, index)} /> }
                      { index + 1 < this.value.length && <i class="el-icon-arrow-down" onClick={e => this.handleDown(e, index)} /> }
                      <i class="el-icon-delete" onClick={e => this.handleDelete(e, index)} />
                    </div>
                    <row.component
                      value={row.data}
                      data={this.data}
                      show-controller={this.currentKey === row.key}
                      onChange={e => this.handleComponentDataChange(e, index)}
                    />
                  </div>
                ))
              }
            </draggable>
            <div class="box-components">
              <h5 class="box-title">选择组件</h5>
              <div class="content">
                {
                  this.renderComponents.map(item => (
                    <div
                      class="item"
                      key={item.name}
                      onClick={() => this.handleAddComponent(item)}
                    >
                      {item.title}
                    </div>
                  ))
                }
              </div>
            </div>
            <el-button class="btn-save" type="primary" onClick={this.handleSave}>保存</el-button>
          </div>
        </div>
      )
    }
  }
</script>
