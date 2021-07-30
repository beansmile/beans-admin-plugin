<template>
  <div class="admin-page-creator-controller">
    <el-tabs v-model="tab" ref="elTab">
      <el-tab-pane  :label="$t('bean.pageGenerator.baseSettings')" name="config" v-if="baseColumns.length">
        <AdminForm
          label-width="100px"
          :columns="baseColumns"
          :value="value"
          @change="$emit('change', $event)"
        >
          <template v-slot:action><span /></template>
        </AdminForm>
      </el-tab-pane>

      <el-tab-pane :label="$t('bean.pageGenerator.styleSettings')" name="style" v-if="styleColumns.length">
        <AdminForm
          label-width="100px"
          :columns="styleColumns"
          :value="value.style"
          @change="$emit('change', { ...value, style: $event })"
        >
          <template v-slot:action><span /></template>
        </AdminForm>
      </el-tab-pane>

      <el-tab-pane :label="$t('bean.pageGenerator.eventSettings')" name="event" v-if="event">
        <EventForm
          label-width="100px"
          :value="value.event"
          v-bind="$attrs"
          @change="$emit('change', { ...value, event: $event })"
        />
      </el-tab-pane>

      <el-tab-pane :label="$t('bean.pageGenerator.animationSettings')" name="animation" v-if="animation">
        <AdminForm
          label-width="100px"
          :columns="animationColumns"
          :value="value.animation"
          @change="$emit('change', { ...value, animation: $event })"
        >
          <template v-slot:action><span /></template>
        </AdminForm>
      </el-tab-pane>

    </el-tabs>
  </div>
</template>


<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import AdminForm from '../form';
import EventForm from './event';
import _ from 'lodash';

@Component({
  components: {
    AdminForm,
    EventForm
  }
})
export default class Controller extends Vue {
  @Prop({ type: Object, default: () => ({}) }) value;
  @Prop({ type: Array, default: () => [] }) configColumns;
  @Prop({ type: Array, default: () => [] }) styleColumns;
  @Prop(Boolean) event;
  @Prop(Boolean) animation;

  tab = 'config';

  get baseColumns() {
    const { enableModuleName } = _.get(this.$vadminConfig, 'pageGenerator', {});
    if (enableModuleName) {
      return [
        {
          prop: 'moduleName',
          label: this.$t('bean.pageGenerator.moduleName'),
          renderCell: {
            component: 'input',
            hint: this.$t('bean.pageGenerator.moduleNameTip')
          }
        },
        ...this.configColumns,
      ];
    }
    return this.configColumns;
  }

  get animationColumns() {
    return [
      {
        prop: 'type',
        label: this.$t('bean.pageGenerator.animationType'),
        renderCell: {
          component: 'select',
          props: {
            clearable: true,
            options: [
              {
                value: 'fade',
                label: this.$t('bean.pageGenerator.fade')
              },
              {
                value: 'scale-up',
                label: this.$t('bean.pageGenerator.scaleUp')
              },
              {
                value: 'scale-down',
                label: this.$t('bean.pageGenerator.scaleDown')
              },
              {
                value: 'slide-top',
                label: this.$t('bean.pageGenerator.slideTop')
              },
              {
                value: 'slide-bottom',
                label: this.$t('bean.pageGenerator.slideBottom')
              },
              {
                value: 'slide-left',
                label: this.$t('bean.pageGenerator.slideLeft')
              },
              {
                value: 'slide-right',
                label: this.$t('bean.pageGenerator.slideRight')
              },
              {
                value: 'shake',
                label: this.$t('bean.pageGenerator.shake')
              }
            ]
          }
        }
      }
    ]
  }

  async mounted() {
    await this.$nextTick();
    this.tab = _.get(_.first(this.$refs.elTab.panes), 'name');
  }

}
</script>
