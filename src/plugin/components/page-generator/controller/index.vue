<template>
  <portal to="page-editor-controller" v-if="visible">
    <div class="admin-page-editor-controller">
      <el-tabs v-model="tab">
        <el-tab-pane :label="$t('bean.pageGenerator.baseSettings')" name="base" v-if="columns.length">
          <AdminForm
            label-width="80px"
            :columns="baseColumns"
            :value="value"
            @change="$emit('change', $event)"
          >
            <template v-slot:action>
              <span />
            </template>
          </AdminForm>
          <slot />
        </el-tab-pane>
        <el-tab-pane :label="$t('bean.pageGenerator.styleSettings')" name="style" v-if="styleColumns.length">
          <AdminForm
            label-width="80px"
            :columns="styleColumns"
            :value="value.style"
            @change="$emit('change', { ...value, style: $event })"
          >
            <template v-slot:action>
              <span />
            </template>
          </AdminForm>
          <slot name="style" />
        </el-tab-pane>
        <el-tab-pane :label="$t('bean.pageGenerator.eventSettings')" name="event" v-if="event">
          <EventForm
            :value="value.event"
            :popup-components="popupComponents"
            :pages="pages"
            v-bind="$attrs"
            @change="$emit('change', { ...value, event: $event })"
          />
          <slot name="event" />
        </el-tab-pane>
        <el-tab-pane :label="$t('bean.pageGenerator.animationSettings')" name="animation" v-if="animation">
          <AnimationForm
            :value="value.animation"
            v-bind="$attrs"
            @change="$emit('change', { ...value, animation: $event })"
          />
        </el-tab-pane>
      </el-tabs>
      <portal-target name="page-editor-popup-controller" />
    </div>
  </portal>
</template>

<script>
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import _ from 'lodash';
  import AdminForm from '../../form';
  import EventForm from './event';
  import AnimationForm from './animation';

  @Component({
    components: {
      AdminForm,
      EventForm,
      AnimationForm
    }
  })
  export default class PageEditorController extends Vue {
    @Prop({ type: Object, default: () => ({}) }) value;
    @Prop(Boolean) visible;
    @Prop(Boolean) event;
    @Prop(Boolean) animation;
    @Prop({ type: [Array, Function], default: () => [] }) pages;
    @Prop({ type: Array, default: () => [] }) columns;
    @Prop({ type: Array, default: () => [] }) styleColumns;
    @Prop({ type: Array, default: () => [] }) popupComponents;

    tab = 'base'

    get baseColumns() {
      const { enableModuleName } = _.get(this.$vadminConfig, 'pageGenerator', {});
      if (enableModuleName) {
        return [
          {
            prop: 'muduleName',
            label: this.$t('bean.pageGenerator.moduleName'),
            renderCell: {
              component: 'input',
              hint: this.$t('bean.pageGenerator.moduleNameTip')
            }
          },
          ...this.columns,
        ];
      }
      return this.columns;
    }

    @Watch('visible', { immediate: true })
    onVisibleChange(visible) {
      if (visible) {
        if (this.columns.length) {
          this.tab = 'base';
          return;
        }
        if (this.styleColumns.length) {
          this.tab = 'style';
          return;
        }
        if (this.event) {
          this.tab = 'event';
          return;
        }
        this.tab = 'animation'
      }
    }
  }
</script>
