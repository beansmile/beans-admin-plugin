<template>
  <div class="admin-page-generator">
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
        :page-columns="pageColumns"
        :page-style-columns="pageStyleColumns"
        @toggle-active-component-key="toggleActiveComponentKey"
        @delete-component="deleteComponent"
        @update-component="updateComponent"
        @update-component-position="updateComponentPosition"
        @add-component="addComponent"
        @update-page="updatePage"
      />
    </div>
    <div class="box-controller">
      <div class="box-type">{{ activeComponentKey ? $t('bean.pageGenerator.componentSettings') : $t('bean.pageGenerator.pageSettings') }}</div>
      <portal-target name="page-editor-controller" class="portal-page-editor-controller" />
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Model, Prop, Provide } from 'vue-property-decorator';
  import ComponentList from './component-list';
  import Screen from './screen';
  import createDefaultComponents from './components';
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
    @Prop({ type: [Array, Function], default: () => [] }) pages;
    @Prop(Array) @Provide() useEvents; // ./controller/event.vue
    @Prop({ type: Array, default: () => [] }) pageColumns;
    @Prop({ type: Array, default: () => [] }) pageStyleColumns;

    activeComponentKey = '';

    get allComponents() {
      const defaultComponents = createDefaultComponents({ $t: this.$t.bind(this) })
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

    async addComponent(componentItem, index = this.components.length) {
      const page = _.cloneDeep(this.value);
      const newComponent = { ...componentItem, key: uuid() };
      page.components = page.components || [];
      page.components.splice(index, 0, newComponent);
      this.$emit('change', page);
      await this.$nextTick();
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
