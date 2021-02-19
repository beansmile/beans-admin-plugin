<template>
  <el-dialog
    :title="`(${$t('bean.selectCountItem', { count: limit })})`"
    :visible="value"
    width="900px"
    append-to-body
    @open="handleOpen"
    @close="handleClose"
    @closed="handleClosed"
    custom-class="admin-resource-uploader"
  >
    <div v-loading="loading">
      <div class="box-header">
        <Uploader
          v-bind="this.$attrs"
          :limit="50"
          @success="handleUploadSuccess"
        />
        <el-form inline @submit.prevent.native="handleFilter">
          <el-form-item :label="$t('bean.folder')" v-if="useResourceFolders">
            <SelectFolder @change="params.dir_id = $event[$event.length - 1]"/>
          </el-form-item>
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
            <ResourceRender
              :video-props="{ controls: false }"
              :value="item"
              :image-props="{ previewSrcList: [] }"
              :show-filename="false"
            />
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
</template>

<script>
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';
  import ResourceRender from '../resource-render';
  import Uploader from './index';
  import _ from 'lodash';
  import SelectFolder from '../select-folder'

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
      SelectFolder,
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

    get useResourceFolders() {
      return _.get(this, '$vadminConfig.folder.useFolder');
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
        const params = { content_type_cont: this.type, per_page: 10, page: this.pagination['current-page'], ...this.params }
        const fetchResource = _.get(this, '$vadminConfig.upload.onFetchResourceBlob') || (() => this.$request.get(requestURL, { params }));
        const { data, pagination } = await fetchResource(params);
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
        const params = { name_cont: name }
        const fetchResource = _.get(this, '$vadminConfig.upload.onFetchResourceBlobTag') || (() => this.$request.get(requestURL, { params }));
        const data = await fetchResource(params)
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
