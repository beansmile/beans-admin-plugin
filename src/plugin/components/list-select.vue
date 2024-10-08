<template>
  <div class="admin-list-select">
    <AdminForm
      :columns="filterColumns"
      @submit="handleSearch"
      class="form-filter"
      v-model="params"
      inline
      v-bind="{ inline: true, ...formProps }"
    >
      <template v-slot:action>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading">{{ $t('bean.actionQuery') }}</el-button>
        </el-form-item>
      </template>
    </AdminForm>

    <slot />

    <div class="panel-container">
      <div class="box-panel">
        <div class="panel-header">
          <span>{{ $t('bean.selected') }}
            <template v-if="enableDrag">
            （{{ $t('bean.dragSort') }}）
            </template>
          </span>
          <el-button v-if="showSelectAll" type="text" :disabled="value.length === 0" @click="handleRemoveAll">{{ $t('bean.actionRemoveAll') }}({{ value.length }})</el-button>
          <span class="num" v-else>{{ value.length }}</span>
        </div>
        <component
          :is="enableDrag ? 'draggable' : 'div'"
          :value="value"
          class="panel-content"
          @end="handleDragChange"
          v-if="value.length"
        >
          <div
            class="list-item"
            v-for="(item, index) in value"
            :key="item[trackBy]"
          >
            <div class="item-label">
              <template v-if="renderLabel">
                <bean-admin-column-render
                  :render-cell="renderLabel"
                  :item="item"
                  :index="index"
                  panel="left"
                />
              </template>
              <template v-else>
                {{ item[label] }}
              </template>
            </div>
            <template v-if="sort">
              <el-button icon="el-icon-arrow-up" size="mini" circle :disabled="index - 1 < 0" @click="handeMove({ oldIndex: index, newIndex: index - 1  })"></el-button>
              <el-button icon="el-icon-arrow-down" size="mini" circle :disabled="index + 1 >= value.length" @click="handeMove({ oldIndex: index, newIndex: index + 1  })"></el-button>
            </template>
            <el-button icon="el-icon-close" size="mini" circle @click="handleCancelSelect(index)"></el-button>
          </div>
        </component>
        <div class="empty" v-else>{{ $t('bean.blankSelected') }}</div>
      </div>
      <div class="box-panel">
        <div class="panel-header">
          <span>{{ $t('bean.list') }}</span>
          <el-button v-if="showSelectAll" type="text" :disabled="renderList.length === 0" @click="handleSelectAll">{{ $t('bean.actionSelectAll') }}({{ renderList.length }})</el-button>
          <span class="num" v-else>{{ renderList.length }}</span>
        </div>
        <div class="panel-content" v-if="renderList.length" v-loading="loading">
          <div
            class="list-item"
            v-for="(item, index) in renderList"
            :key="item[trackBy]"
          >
            <div class="item-label">
              <template v-if="renderLabel">
                <bean-admin-column-render
                  :render-cell="renderLabel"
                  :item="item"
                  :index="index"
                  panel="right"
                />
              </template>
              <template v-else>
                {{ item[label] }}
              </template>
            </div>
            <el-button icon="el-icon-check" circle @click="handleSelect(item)"></el-button>
          </div>
        </div>
        <div class="empty" v-else>{{ $t('bean.noOptions') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model } from 'vue-property-decorator';
  import draggable from 'vuedraggable';
  import { arrayMove } from '../utils';
  import AdminForm from './form';
  import { screenService } from '../services';
  import _ from 'lodash';

  @Component({
    components: {
      AdminForm,
      draggable
    }
  })
  export default class ListSelect extends Vue {
    @Model('change', { type: Array, default: () => [] }) value;
    @Prop({ type: String, default: 'id' }) trackBy;
    @Prop({ type: String, default: 'label' }) label;
    @Prop({ type: Boolean, default: true }) sort;
    @Prop({ type: Function }) renderLabel;
    @Prop({ type: Array, default: () => [] }) filterColumns;
    @Prop({ type: Function, default: () => [] }) onFilter;
    @Prop({ type: Function }) onLoad;
    @Prop({ type: Object, default: () => ({}) }) formProps;
    @Prop(Boolean) showSelectAll;

    loading = false;
    data = [];
    params = {};

    // 移动端不打开拖拽功能
    get enableDrag() {
      return this.sort && (!screenService.isMobile);
    }

    get valueTrackByValues() {
      return this.value.map(item => item[this.trackBy]);
    }

    get renderList() {
      return this.data.filter(item => !this.valueTrackByValues.includes(item[this.trackBy]));
    }

    async mounted() {
      if (this.onLoad) {
        this.loading = true;
        try {
          this.data = await this.onLoad();
        } finally {
          this.loading = false;
        }
      }
    }

    handleSelect(item) {
      this.$emit('change', [item].concat(this.value));
    }

    handleSelectAll() {
      this.$emit('change', _.cloneDeep(this.renderList).concat(this.value))
    }

    handleCancelSelect(index) {
      const value = JSON.parse(JSON.stringify(this.value));
      value.splice(index, 1);
      this.$emit('change', value);
    }

    handleRemoveAll() {
      this.$emit('change', []);
    }

    handleDragChange({ oldIndex, newIndex }) {
      if (oldIndex !== newIndex) {
        this.$emit('change', arrayMove(this.value, oldIndex, newIndex));
      }
    }

    handeMove({ oldIndex, newIndex }) {
      if (oldIndex !== newIndex) {
        this.$emit('change', arrayMove(this.value, oldIndex, newIndex));
      }
    }

    async handleSearch() {
      if (this.loading) {
        return;
      }
      if (this.onFilter) {
        this.loading = true;
        try {
          this.data = await this.onFilter(JSON.parse(JSON.stringify(this.params)));
        } finally {
          this.loading = false;
        }
      }
    }
  }
</script>
