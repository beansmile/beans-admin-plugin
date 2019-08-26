<template>
  <el-pagination
    background
    :layout="layout"
    :page-sizes="pagesizes"
    @current-change="onPageChange"
    @size-change="onSizeChange"
    v-bind="pagination"
  />
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
  @Prop({ type: Object, default: () => ({}) }) pagination;

  pagesizes = [10, 25, 35, 50, 100]
  layout = 'total, prev, pager, next, sizes, jumper'

  onPageChange(currentPage) {
    this.$router.push({ query: { ...this.$route.query, page: currentPage } });
  }

  onSizeChange(size) {
    const totalPage = Math.ceil(this.pagination.total / size);
    this.$router.replace({ query: { ...this.$route.query, per_page: size, page: Math.min(this.$route.query.page, totalPage) } });
  }
}
</script>

<style lang="less" scoped>
  .el-pagination {
    flex-shrink: 0;
    height: 70px;
    display: flex;
    align-items: center;
  }
</style>
