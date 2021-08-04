<template>
  <div class="admin-page-creator">
    <div class="admin-page-creator__toolbar">
      <el-button type="primary" @click="drawer.component = true" v-if="screenService.isMobile">{{ $t('bean.pageGenerator.selectComponent') }}</el-button>
      <el-button type="primary" @click="handleShowPageController" v-if="showPageSetting">{{ $t('bean.pageGenerator.pageSettings') }}</el-button>
      <section class="section-global-comp-control-list">
        <div class="group" v-for="(globalGroup, globalName) in globalComponentsGroupedByName" :key="globalName">
          <div class="group-item" :class="{ active: item.key === activeComponentKey }" @click="handleToggleComponentActive(item.key)" v-for="(item, index) in globalGroup" :key="item.key">
            <div class="group-item-name">{{ $get(item, 'config.name') || `${componentsKeyByName[globalName].title}-${index + 1}` }}</div>
            <el-button class="btn-ctrl" size="mini" icon="el-icon-edit" type="primary" circle @click="handleShowComponentController(item, $event)"></el-button>
            <el-button class="btn-ctrl" size="mini" icon="el-icon-delete" type="danger" circle @click="handleDelete(item, $event)"></el-button>
          </div>
        </div>
      </section>
    </div>

    <div class="admin-page-creator__main">
      <div class="admin-page-creator__components">
        <component
          :is="screenService.isMobile ? 'el-drawer' : 'div'"
          v-bind="screenService.isMobile ? {
            size: '100%',
            'append-to-body': true,
            title: $t('bean.pageGenerator.selectComponent')
          } : {}"
          :visible.sync="drawer.component"
        >
          <component
            :is="draggable ? 'Draggable' : 'div'"
            v-bind="draggable ? {
              sort: false,
              group: { name: 'component', pull: 'clone', put: false },
              value: components
            } : {}"
            class="admin-page-creator__components-list"
          >
            <el-button
              :icon="item.icon"
              class="admin-page-creator__components-list__item"
              v-for="item in components"
              :key="item.name"
              @click="handleAdd(item)"
            >
              <span class="component-name">{{ item.title }}</span>
            </el-button>
          </component>
        </component>
      </div>

      <div class="admin-page-creator__screen">
        <Page
          :showHeader="showPageSetting"
          :value="value ? (value.config || {}) : {}"
          ref="page"
        >
          <!-- global组件 -->
          <div
            v-for="item in renderComponents.global"
            :key="item.key"
          >
            <component
              v-show="item.name !== 'popup' || item.key === activeComponentKey"
              :is="componentsKeyByName[item.name].component"
              :class="{ active: item.key === activeComponentKey }"
              :value="item.config"
              @change="handleComponentChange(item.key, $event)"
            />
          </div>
          <!-- 普通组件 -->
          <component
            :is="draggable ? 'Draggable' : 'div'"
            v-bind="draggable ? {
              group: 'component',
              draggable: '.section-component',
              value: renderComponents.common,
              class: 'scroll-y'
            } : {}"
            ref="scrollContent"
            @change="handleDragChange"
          >
            <section class="section-component" :class="{ active: item.key === activeComponentKey }" v-for="item in renderComponents.common" :key="item.key">
              <template v-if="$get(componentsKeyByName, `${item.name}.component`)">
                <div class="component-toolbar">
                  <span class="component-title">{{ componentsKeyByName[item.name].title }}</span>
                  <el-button class="btn-ctrl" size="mini" icon="el-icon-arrow-up" circle :disabled="getPrePosition(item._index) === -1" @click="handleMoveUp(item._index)"></el-button>
                  <el-button class="btn-ctrl" size="mini" icon="el-icon-arrow-down" circle :disabled="getNextPosition(item._index) === -1" @click="handleMoveDown(item._index)"></el-button>
                  <el-button class="btn-ctrl" size="mini" icon="el-icon-edit" type="primary" :disabled="!$get(componentsKeyByName, `${item.name}.controller`)" circle @click="handleShowComponentController(item)"></el-button>
                  <el-button class="btn-ctrl" size="mini" icon="el-icon-delete" type="danger" circle @click="handleDelete(item)"></el-button>
                </div>
                <Animation :type="$get(item.config, 'animation.type', '')">
                  <component
                    :is="componentsKeyByName[item.name].component"
                    :value="item.config"
                    @change="handleComponentChange(item.key, $event)"
                  />
                </Animation>
              </template>
            </section>
          </component>
        </Page>
      </div>

      <div class="admin-page-creator__controller">
        <component
          :is="screenService.isMobile ? 'el-drawer' : 'div'"
          v-bind="screenService.isMobile ? {
            size: '100%',
            'append-to-body': true,
            title: activeComponent ? $t('bean.pageGenerator.componentSettings') : $t('bean.pageGenerator.pageSettings'),
          } : {
            style: { height: '100%' }
          }"
          :visible.sync="drawer.controller"
        >
          <div v-if="activeComponent" :key="activeComponent.key" style="height: 100%">
            <component
              v-if="$get(componentsKeyByName, `${activeComponent.name}.controller`)"
              :is="componentsKeyByName[activeComponent.name].controller"
              :value="activeComponent.config || {}"
              :useEvents="useEvents"
              :pages="pages"
              :popupComponents="globalComponentsGroupedByName.popup"
              :visible="drawer.controller"
              @change="handleComponentChange(activeComponent.key, $event)"
              @close="drawer.controller = false"
            />
          </div>
          <template v-else>
            <PageController
              v-if="showPageSetting"
              :value="value.config || {}"
              @change="handlePageChange"
            />
          </template>
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Model, Emit, ProvideReactive, Prop } from 'vue-property-decorator';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import Draggable from 'vuedraggable';
import { screenService } from '../../services';
import Animation from './animation';
import { arrayMove } from '../../utils';
import Page from './components/page';
import Text from './components/text';
import Title from './components/title';
import Image from './components/image';
import ImageArea from './components/image-area';
import MultipleImage from './components/multiple-image';
import Video from './components/video';
import Swiper from './components/swiper';
import SplitLine from './components/split-line';
import Blank from './components/blank';
import ScrollX from './components/scroll-x';
import Map from './components/map';
import Navbar from './components/navbar';
import Popup from './components/popup';
import FixedButton from './components/fixed-button';

@Component({
  components: {
    Page,
    PageController: Page.Controller,
    Animation,
    Draggable
  }
})
export default class PageCreator extends Vue {
  @Model('change', { type: Object, default: () => ({ config: {}, components: [] }) }) value;
  @ProvideReactive() pageWidth = 375;
  @Prop(Array) useEvents; // ./controller/event.vue
  @Prop({ type: [Array, Function], default: () => [] }) pages;
  @Prop({ type: Array, default: () => [] }) useComponents;
  @Prop({ type: Boolean, default: true }) showPageSetting; // 是否显示页面设置

  screenService = screenService;

  drawer = {
    component: false,
    controller: false
  };

  activeComponentKey = '';
  $get = _.get;

  get draggable() {
    return screenService.isLg;
  }

  get activeComponent() {
    const components = _.get(this.value, 'components') || [];
    return _.find(components, item => item.key === this.activeComponentKey);
  }

  get globalComponentsGroupedByName() {
    return _.groupBy(
      this.renderComponents.global,
      'name'
    );
  }

  get renderComponents() {
    const common = [];
    const global = [];
    const components = _.get(this.value, 'components') || [];
    components.forEach((item, index) => {
      const component = {
        ...item,
        // 存一下真实index
        _index: index
      }
      if (item.global) {
        global.push(component);
      } else {
        common.push(component);
      }
    });
    return {
      common,
      global
    }
  }

  get components() {
    const defaultComponents = [
      {
        title: this.$t('bean.pageGenerator.text'),
        name: 'text',
        icon: 'iconfont icon-TextDescription-1',
        component: Text,
        controller: Text.Controller,
        defaultValue: Text.defaultValue
      },
      {
        title: this.$t('bean.pageGenerator.title'),
        name: 'title',
        icon: 'iconfont icon-titleicon',
        component: Title,
        controller: Title.Controller,
        defaultValue: Title.defaultValue
      },
      {
        title: this.$t('bean.pageGenerator.image'),
        name: 'image',
        icon: 'iconfont icon-tupian1',
        component: Image,
        controller: Image.Controller,
        defaultValue: Image.defaultValue
      },
      {
        title: this.$t('bean.pageGenerator.imageHotArea'),
        name: 'image-area',
        icon: 'iconfont icon-tupian1',
        component: ImageArea,
        controller: ImageArea.Controller,
        defaultValue: ImageArea.defaultValue
      },
      {
        title: this.$t('bean.pageGenerator.multipleImage'),
        name: 'multiple-image',
        icon: 'iconfont icon-tupian1',
        component: MultipleImage,
        controller: MultipleImage.Controller,
        defaultValue: MultipleImage.defaultValue
      },
      {
        title: this.$t('bean.pageGenerator.video'),
        name: 'video',
        icon: 'iconfont icon-shipin',
        component: Video,
        controller: Video.Controller,
        defaultValue: Video.defaultValue
      },
      {
        title: this.$t('bean.pageGenerator.swiper'),
        name: 'swiper',
        icon: 'iconfont icon-lunbotu1',
        component: Swiper,
        controller: Swiper.Controller,
        defaultValue: Swiper.defaultValue
      },
      {
        title: this.$t('bean.pageGenerator.splitLine'),
        name: 'split-line',
        icon: 'iconfont icon-fengexian2',
        component: SplitLine,
        controller: SplitLine.Controller,
        defaultValue: SplitLine.defaultValue
      },
      {
        title: this.$t('bean.pageGenerator.blank'),
        name: 'blank',
        icon: 'el-icon-files',
        component: Blank,
        controller: Blank.Controller,
        defaultValue: Blank.defaultValue
      },
      {
        title: this.$t('bean.pageGenerator.scrollX'),
        name: 'scroll-x',
        icon: 'iconfont icon-zuoyouhuadongtu',
        component: ScrollX,
        controller: ScrollX.Controller,
        defaultValue: ScrollX.defaultValue
      },
      {
        title: this.$t('bean.pageGenerator.map'),
        name: 'map',
        icon: 'iconfont icon-ditu1',
        component: Map,
        controller: Map.Controller,
        defaultValue: Map.defaultValue
      },
      {
        title: this.$t('bean.pageGenerator.navbar'),
        name: 'navbar',
        icon: 'iconfont icon-daohangtiao',
        component: Navbar,
        controller: Navbar.Controller,
        defaultValue: Navbar.defaultValue
      },
      {
        title: this.$t('bean.pageGenerator.popup'),
        name: 'popup',
        global: true,
        icon: 'iconfont icon-danchuang',
        component: Popup,
        controller: Popup.Controller,
        defaultValue: Popup.defaultValue
      },
      {
        title: this.$t('bean.pageGenerator.fixedButton'),
        name: 'fixed-button',
        global: true,
        icon: 'el-icon-paperclip',
        component: FixedButton,
        controller: FixedButton.Controller,
        defaultValue: FixedButton.defaultValue
      }
    ];
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

  get componentsKeyByName() {
    return _.keyBy(this.components, 'name');
  }

  mounted() {
    this.pageWidth = this.$refs.page.$el.offsetWidth;
    this.resizeHander = _.debounce(() => {
      this.pageWidth = this.$refs.page.$el.offsetWidth;
    }, 500);
    window.addEventListener('resize', this.resizeHander);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHander);
  }

  add(item, index) {
    const page = _.cloneDeep(this.value);
    const newComponent = { ..._.pick(item, ['title', 'name', 'global']), key: uuid(), config: _.cloneDeep(item.defaultValue) };
    const { common, global } = this.renderComponents;
    if (newComponent.global) {
      global.push(newComponent);
    } else {
      if (_.isUndefined(index)) {
        common.push(newComponent);
      } else {
        common.splice(index, 0, newComponent);
      }
    }
    page.components = [...common, ...global];
    this.$emit('change', page);
    return newComponent;
  }

  @Emit('change')
  delete(item) {
    const page = _.cloneDeep(this.value);
    _.remove(page.components, i => i.key === item.key);
    return page;
  }

  @Emit('change')
  move({ oldIndex, newIndex } = {}) {
    const page = _.cloneDeep(this.value);
    page.components = arrayMove(page.components || [], oldIndex, newIndex);
    return page;
  }

  async handleAdd(item) {
    const newItem = this.add(item);
    this.drawer.component = false;
    await this.$nextTick();
    this.handleShowComponentController(newItem);
    const scrollContent = this.$refs.scrollContent;
    if (scrollContent && scrollContent.$el) {
      scrollContent.$el.scrollTop = 9999;
    }
  }

  async handleDelete(item, event) {
    event && event.stopPropagation();
    await this.$confirm('确定删除此组件？', '提示');
    this.delete(item);
  }

  @Emit('change')
  handlePageChange(data) {
    const page = _.cloneDeep(this.value);
    _.set(page, 'config', data);
    return page;
  }

  @Emit('change')
  handleComponentChange(componentKey, data) {
    const page = _.cloneDeep(this.value);
    const component = (page.components || []).find(item => item.key === componentKey);
    _.set(component, 'config', data);
    return page;
  }

  async handleDragChange(e) {
    const { moved, added } = e;
    if (moved) {
      this.move(moved);
    }
    if (added) {
      const newItem = this.add(added.element, added.newIndex);
      await this.$nextTick();
      this.handleShowComponentController(newItem);
    }
  }

  getPrePosition(index) {
    const components = _.get(this, 'value.components') || [];
    return _.findLastIndex(components, (item, i) => (i < index) && (!item.global));
  }

  getNextPosition(index) {
    const components = _.get(this, 'value.components') || [];
    return components.findIndex((item, i) => (i > index) && (!item.global));
  }

  handleMoveUp(index) {
    const targetIndex = this.getPrePosition(index);
    this.move({ oldIndex: index, newIndex: targetIndex });
  }

  handleMoveDown(index) {
    const targetIndex = this.getNextPosition(index);
    this.move({ oldIndex: index, newIndex: targetIndex });
  }

  handleToggleComponentActive(key) {
    this.activeComponentKey = this.activeComponentKey === key ? '' : key;
  }

  handleShowPageController() {
    this.activeComponentKey = '';
    this.drawer.controller = true;
  }

  handleShowComponentController(item, event) {
    event && event.stopPropagation();
    this.activeComponentKey = item.key;
    this.drawer.controller = true;
  }

}
</script>
