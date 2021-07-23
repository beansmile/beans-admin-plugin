<template>
  <el-pagination
    background
    @current-change="onPageChange"
    @size-change="onSizeChange"
    v-bind="{ 'page-sizes': pagesizes, layout, pageSize, total, currentPage, ...$attrs }"
  />
</template>

<script>
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { screenService } from '../services';

@Component
export default class AdminPagination extends Vue {
  @Prop({ type: Number }) pageSize;
  @Prop({ type: Number }) total;
  @Prop({ type: Number }) currentPage;

  pagesizes = [10, 25, 35, 50, 100]

  get layout() {
    return screenService.isMobile ? 'total, prev, next' : 'total, prev, pager, next, sizes, jumper'
  }

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
