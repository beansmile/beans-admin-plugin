<template>
  <div class="page-generator">
    <div class="box-components-list">
      <ComponentList
        :components="allComponents"
        @add-component="handleAddComponentByClick"
      />
    </div>
    <div class="box-screen">
      <Screen
        :active-key="activeComponentKey"
        :pages="pages"
        :page="value"
        :components="allComponents"
        @toggle-active-component-key="toggleActiveComponentKey"
        @delete-component="deleteComponent"
        @update-component="updateComponent"
        @update-component-position="updateComponentPosition"
        @add-component="addComponent"
        @update-page="updatePage"
      />
    </div>
    <div class="box-controller">
      <div class="box-type">{{ !activeComponentKey ? '页面' : '组件' }}设置</div>
      <portal-target name="page-editor-controller" class="portal-page-editor-controller" />
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';
  import ComponentList from './component-list';
  import Screen from './screen';
  import defaultComponents from './components';
  import _ from 'lodash';
  import { arrayMove } from '../../utils';
  import { v4 as uuid } from 'uuid';

  @Component({
    components: {
      ComponentList,
      Screen
    }
  })
  export default class PageGenerator extends Vue {
    @Model('change', { type: Object, default: () => ({
      components: [],
      config: {},
      style: {}
    }) }) value;
    @Prop({ type: Array, default: () => [] }) useComponents;
    @Prop({ type: Array, default: () => [] }) pages;

    activeComponentKey = '';

    get allComponents() {
      if (!this.useComponents.length) {
        return defaultComponents;
      }

      return this.useComponents.map(item => {
        if (_.isString(item)) {
          return defaultComponents.find(defaultCom => defaultCom.name === item);
        }
        return item;
      }).filter(Boolean);
    }

    get components() {
      return _.get(this.value, 'components') || [];
    }

    async handleAddComponentByClick(item) {
      this.addComponent(item);
      await this.$nextTick();
      this.$el.querySelector('.device-content').parentNode.scrollTop = 9999;
    }

    toggleActiveComponentKey(key) {
      this.activeComponentKey = this.activeComponentKey === key ? '' : key;
    }

    deleteComponent(componentItem) {
      const page = _.cloneDeep(this.value);
      const index = this.components.findIndex(item => item.key === componentItem.key);
      page.components.splice(index, 1);
      this.$emit('change', page);
    }

    updateComponent(componentItem, valueKey, value) {
      const page = _.cloneDeep(this.value);
      const container = page.components || [];
      const component = container.find(item => item.key === componentItem.key);
      _.set(component, valueKey, value);
      this.$emit('change', page);
    }

    updateComponentPosition(oldIndex, newIndex) {
      if (oldIndex !== newIndex) {
        const page = _.cloneDeep(this.value);
        page.components = arrayMove(page.components || [], oldIndex, newIndex);
        this.$emit('change', page);
      }
    }

    addComponent(componentItem, index = this.components.length) {
      const page = _.cloneDeep(this.value);
      const newComponent = { ...componentItem, key: uuid() };
      page.components = page.components || [];
      page.components.splice(index, 0, newComponent);
      this.$emit('change', page);
      this.toggleActiveComponentKey(newComponent.key);
    }

    updatePage(key, value) {
      const page = _.cloneDeep(this.value);
      _.set(page, key, value);
      _.set(page, 'title', _.get(page, 'config.title'));
      this.$emit('change', page);
    }
  }
</script>

<style lang="scss" scoped>
  .page-generator {
    width: 100%;
    height: 100%;
    display: flex;

    .box-type {
      font-size: 16px;
      padding: 15px;
    }

    .box-components-list,
    .box-controller,
    .box-screen {
      background: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }

    .box-components-list {
      flex-shrink: 0;
      width: 280px;
      padding: 15px;
    }

    .box-screen {
      flex-shrink: 0;
      width: 375px;
      margin: 0 40px;
      align-self: flex-start;
    }

    .box-controller {
      flex: 1;
      background: #fff;
      display: flex;
      flex-direction: column;

      .box-type {
        flex-shrink: 0;
      }

      .portal-page-editor-controller {
        flex: 1;
        overflow: hidden;
      }
    }
  }
</style>
