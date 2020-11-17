<template>
  <div class="admin-resource-uploader">
    <el-dialog
      :title="`(${$t('bean.selectCountItem', { count: limit })})`"
      :visible="value"
      modal-append-to-body
      @open="handleOpen"
      @close="handleClose"
      @closed="handleClosed"
    >
      <div v-loading="loading">
        <div class="box-header">
          <Uploader
            v-bind="this.$attrs"
            :limit="10"
            @success="handleUploadSuccess"
          />
          <el-form inline @submit.prevent.native="handleFilter">
            <el-form-item :label="$t('bean.fileName')">
              <el-input v-model="params.filename_cont" />
            </el-form-item>

            <el-form-item :label="$t('bean.tag')">
              <el-select
                v-model="params.tags_name_in"
                multiple
                filterable
                remote
                :remote-method="handleGetTags"
              >
                <el-option v-for="(item, index) in tags" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="handleFilter">{{ $t('bean.actionFilter') }}</el-button>
              <el-button @click="handleReset">{{ $t('bean.actionReset') }}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="box-list">
          <div
            class="item"
            v-for="item in data"
            :key="item.id"
          >
            <div
              class="item-content"
              @click="handleSelect(item)"
              :class="{ active: selectedIds.includes(item.id) }"
            >
              <div class="mask"></div>
              <i class="el-icon-check"></i>
              <el-popconfirm
                :title="$t('bean.confirmDeleteTip')"
                class="btn-delete"
                @onConfirm="handleDelete(item.id)"
              >
                <i class="el-icon-circle-close" slot="reference" @click.stop></i>
              </el-popconfirm>
              <ResourceRender :value="item" :image-props="{ previewSrcList: [] }" />
            </div>
            <p>{{ item.filename }}</p>
          </div>
        </div>
        <div class="box-pagination" v-if="data.length > 0">
          <el-pagination
            background
            v-bind="pagination"
            layout="prev, pager, next"
            @current-change="handlePageChange"
          />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t('bean.actionClose') }}</el-button>
        <el-button type="primary" @click="handleConfirm" v-if="limit > 1" :disabled="selected.length <= 0">{{ $t('bean.actionConfirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';
  import ResourceRender from '../resource-render';
  import Uploader from './index';
  import _ from 'lodash';

  const TYPES = {
    image: '图片',
    video: '视频',
    audio: '音频',
    text: '文本',
    xml: 'XML',
    json: 'JSON',
    pdf: 'PDF',
    sheet: 'Sheet'
  }

  @Component({
    components: {
      Uploader,
      ResourceRender
    }
  })
  export default class AdminResourceUploader extends Vue {
    @Model('change', { type: Boolean }) value;
    @Prop({ type: String, default: 'image' }) type;
    @Prop({ type: Number, default: 1 }) limit;

    TYPES = TYPES;
    loading = false;
    data = [];
    selected = [];
    pagination = {
      'current-page': 1
    };
    params = {};
    tags = [];
    tagLoading = false;

    get selectedIds() {
      return this.selected.map(item => item.id);
    }

    handleClose() {
      this.$emit('change', false);
    }

    handleClosed() {
      this.selected = [];
      this.params = {};
    }

    handleOpen() {
      this.fetchData();
    }

    handleUploadSuccess() {
      this.fetchData();
    }

    async fetchData() {
      this.loading = true;
      try {
        const requestURL = _.get(this, '$vadminConfig.upload.resourceBlobURL');
        const { data, pagination } = await this.$request.get(requestURL, { params: { content_type_cont: this.type, per_page: 10, page: this.pagination['current-page'], ...this.params } });
        this.data = data;
        this.pagination = pagination;
      } finally {
        this.loading = false;
      }
    }

    handlePageChange(page) {
      this.pagination['current-page'] = page;
      this.fetchData();
    }

    async handleGetTags(name) {
      this.tagLoading = true;
      try {
        const requestURL = _.get(this, '$vadminConfig.upload.resourceBlobTagURL');
        const { data } = await this.$request.get(requestURL, { params: { name_cont: name } });
        this.tags = data.map(item => ({
          label: item.name,
          value: item.name
        }));
      } finally {
        this.tagLoading = false;
      }
    }

    handleSelect(item) {
      if (this.limit === 1) {
        this.$emit('success', item);
        this.handleClose();
      } else {
        const index = this.selected.findIndex(selectItem => item.id === selectItem.id);
        if (index >= 0) {
          this.selected.splice(index, 1);
        } else {
          if (this.limit > this.selected.length) {
            this.selected.push(item);
          }
        }
      }
    }

    handleConfirm() {
      this.$emit('success', JSON.parse(JSON.stringify(this.selected)));
      this.handleClose();
    }

    async handleDelete(id) {
      await this.$request.delete(`active_storage/blobs/${id}`);
      this.fetchData();
    }

    handleFilter() {
      this.pagination['current-page'] = 1;
      this.fetchData();
    }

    handleReset() {
      this.params = {};
      this.fetchData();
    }
  }
</script>

<style lang="scss" scoped>
  .box-header {
    .el-form {
      margin-top: 20px;

      .el-form-item {
        margin-bottom: 0;
      }
    }
  }

  .box-list {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    margin-right: -10px;
    padding-top: 20px;

    .item {
      width: 100px;
      margin-right: 10px;
      margin-bottom: 10px;
      line-height: 1.2;

      .item-content {
        box-sizing: border-box;
        position: relative;
        border: 1px solid $border-light;
        cursor: pointer;

        &:hover {
          .mask,
          .btn-delete {
            opacity: 1;
          }
        }

        &.active {
          .mask {
            opacity: 1;
          }

          .el-icon-check {
            display: block;
          }
        }
      }

      .el-icon-check {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 40px;
        color: $primary;
        z-index: 3;
      }

      .mask,
      .btn-delete {
        opacity: 0;
        transition: opacity .3s;
      }

      .mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .3);
        z-index: 1;
      }

      .btn-delete {
        font-size: 16px;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
        z-index: 2;
      }
    }
  }

  .box-pagination {
    margin-top: 20px;
  }
</style>
