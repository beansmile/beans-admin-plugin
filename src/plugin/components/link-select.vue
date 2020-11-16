<template>
  <div class="admin-link-select">
    <el-form label-position="left" label-width="40px">
      <el-form-item label="类型">
        <el-select
          v-model="value.type"
          filterable
          clearable
          @change="handleLinkTypeChange"
          class="link-type-select"
        >
          <el-option
            v-for="item in linkTypes"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="链接" v-if="value.type">
        <el-select
          v-model="value.src"
          filterable
          clearable
          :remote="true"
          :remote-method="searchLinks"
          @change="handleLinkSrcChange"
          class="link-src-select"
          :disabled="!value.type"
        >
          <el-option
            v-for="(value, label) in links"
            :key="label"
            :label="label"
            :value="value"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator';

  @Component
  export default class LinkSelect extends Vue {
    @Model('change', { type: Object, default: () => {} }) value;
    @Prop({ type: Array, default: () => [] }) linkTypes;

    links = [];

    async searchLinks(keyword) {
      // TODO: 先返回50条数据，之后改成可以滚动加载的
      const { data } = await this.$request.get('/bean/page_links', { params: { type: this.value.type, keyword: keyword, per_page: 50 } });
      if (data.length === 0) {
        this.links = {}
      } else {
        this.links = Object.assign(...data);
      }
    }

    syncChange() {
      this.$emit('change', this.value);
    }

    handleLinkTypeChange(val) {
      this.$set(this.value, 'type', val);
      this.$set(this.value, 'src', '');
      this.syncChange();
    }

    handleLinkSrcChange(val) {
      this.$set(this.value, 'src', val);
      this.syncChange();
    }

    @Watch('value.type', { immediate: true })
    async onValueChange(type) {
      if (type) {
        this.searchLinks()
      }
    }
  }
</script>

<style lang="scss">
</style>
