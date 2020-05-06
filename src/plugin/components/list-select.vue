<template>
  <div class="c-list-select">
    <el-form
      inline
      @submit.native.prevent="handleSearch"
      v-if="filterColumns.length"
      class="form-filter"
    >
      <c-source-form-item
        v-for="column in filterColumns"
        :key="column.prop"
        :column="column"
        v-model="params"
      />
      <el-form-item>
        <el-button type="primary" native-type="submit" :loading="loading">{{ $t('查询') }}</el-button>
      </el-form-item>
    </el-form>

    <div class="panel-container">
      <div class="box-panel">
        <div class="panel-header">
          <span>已选择
            <template v-if="sort">
            （拖拽排序）
            </template>
          </span>
          <span class="num">{{ value.length }}</span>
        </div>
        <component
          :is="sort ? 'draggable' : 'div'"
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
                <v-node :render-node="(h) => renderLabel(h, { item, index, penel: 'left' })" />
              </template>
              <template v-else>
                {{ item[label] }}
              </template>
            </div>
            <el-button icon="el-icon-close" circle @click="handleCancelSelect(index)"></el-button>
          </div>
        </component>
        <div class="empty" v-else>已选择为空</div>
      </div>
      <div class="box-panel">
        <div class="panel-header">
          <span>列表</span>
          <span class="num">{{ renderList.length }}</span>
        </div>
        <div class="panel-content" v-if="renderList.length" v-loading="loading">
          <div
            class="list-item"
            v-for="(item, index) in renderList"
            :key="item[trackBy]"
          >
            <div class="item-label">
              <template v-if="renderLabel">
                <v-node :render-node="(h) => renderLabel(h, { item, index, penel: 'right' })" />
              </template>
              <template v-else>
                {{ item[label] }}
              </template>
            </div>
            <el-button icon="el-icon-check" circle @click="handleSelect(item)"></el-button>
          </div>
        </div>
        <div class="empty" v-else>没有可选择项</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model } from 'vue-property-decorator';
  import draggable from 'vuedraggable';
  import { arrayMove } from '../utils';
  // TODO i18n

  @Component({
    components: {
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

    loading = false;
    data = [];
    params = {};

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

    handleCancelSelect(index) {
      const value = JSON.parse(JSON.stringify(this.value));
      value.splice(index, 1);
      this.$emit('change', value);
    }

    handleDragChange({ oldIndex, newIndex }) {
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
