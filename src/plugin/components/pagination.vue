<template>
  <el-pagination
    background
    :layout="layout"
    :page-sizes="pagesizes"
    @current-change="onPageChange"
    @size-change="onSizeChange"
    v-bind="{ pageSize, total, currentPage, ...$attrs }"
  />
</template>

<script>
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class AdminPagination extends Vue {
  @Prop({ type: Number }) pageSize;
  @Prop({ type: Number }) total;
  @Prop({ type: Number }) currentPage;

  pagesizes = [10, 25, 35, 50, 100]
  layout = 'total, prev, pager, next, sizes, jumper'

  @Emit('submit')
  onPageChange(currentPage) {
    return {
      page: currentPage,
      size: this.pageSize
    };
  }

  @Emit('submit')
  onSizeChange(size) {
    const totalPage = Math.ceil(this.total / size);
    const page = this.currentPage;
    return {
      page: Math.min(page, totalPage),
      size
    }
  }
}
</script>
