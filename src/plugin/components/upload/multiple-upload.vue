<template>
  <el-dialog
    :visible="value"
    :title="$t('bean.actionUpload')"
    append-to-body
    @close="$emit('change', false)"
    @closed="$emit('closed')"
    v-loading="loading"
  >
    <div class="admin-multiple-upload">
      <input
        type="file"
        multiple
        class="input-file"
        :ref="FILE_INPUT_REF_NAME"
        :accept="accept"
        @change="handleFileChange"
      />
      <el-row class="btn-group">
        <el-button type="primary" icon="el-icon-plus" :disabled="tableData.length >= limit" @click="handleUploadBtnClick">{{ $t('bean.actionChooseFile') }}</el-button>
        <el-button type="warning" @click="handleUploadAll" :disabled="!needUploadData.length">{{ $t('bean.actionUploadAll') }}</el-button>
        <el-button type="danger" @click="handleDeleteAll" :disabled="!tableData.length">{{ $t('bean.actionRemoveAll') }}</el-button>
      </el-row>

      <FormSelect
        v-if="resourceTagURL"
        class="tags-selector"
        clearable
        multiple
        :xRemoteSearch="fetchTags"
        default-first-option
        :placeholder="$t('bean.chooseBlobTagTip')"
        allowCreate
        v-model="tags"
      />

      <el-alert show-icon type="warning" :title="uploadHint" :closable="false"></el-alert>

      <div class="box-table">
        <AdminTable
          :value="tableData"
          :columns="columns"
          :actions="actions"
        />
      </div>
    </div>
    <template #footer>
      <el-button type="primary" @click="handleSubmit">{{ $t('bean.actionConfirm') }}</el-button>
      <el-button @click="handleCloseDialog">{{ $t('bean.actionCancel') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import AdminTable from '../table';
import FormSelect from '../form/select';
import { checkFileSize, uploadFile } from '../../utils';
import _ from 'lodash';

@Component({
  components: {
    AdminTable,
    FormSelect
  }
})
export default class MultipleUploadDialog extends Vue {
  @Model('change', { type: Boolean }) value;
  @Prop({ type: Number, default: 1 }) limit;
  @Prop({ type: Object }) cropper;
  @Prop({ type: String, default: 'image/*' }) accept;
  @Prop({ type: Number, default: 3 }) size; // 单位M
  @Prop(String) hint; // 提示

  FILE_INPUT_REF_NAME = 'fileInput';

  tableData = [];
  tags = [];
  loading = false;

  get columns() {
    return [
      {
        prop: 'file.name',
        label: this.$t('bean.fileName')
      },
      {
        prop: 'file.size',
        label: this.$t('bean.fileSize'),
        renderCell(h, { props: { value } }) {
          return <span>{(value / 1024 / 1024).toFixed(3) + 'M'}</span>;
        }
      },
      {
        prop: 'file.type',
        label: this.$t('bean.fileType'),
      },
      {
        prop: 'result.url',
        label: this.$t('bean.uploadSuccess'),
        renderCell: 'bool'
      }
    ];
  }

  get uploadHint() {
    return this.hint || `${this.$t('bean.fileFormat')}：${this.accept}，${this.$t('bean.maximumFileSize', { size: this.size })}M，${this.$t('bean.maximumUploadFileCount', { count: this.limit })}`
  }

  get needUploadData() {
    return this.tableData.filter(item => !item.result);
  }

  get resourceTagURL() {
    return _.get(this, '$vadminConfig.upload.resourceBlobTagURL');
  }

  actions({ $index }) {
    return [
      (h) => <el-button h={h} type="danger" onClick={() => this.tableData.splice($index, 1)}>移除</el-button>
    ]
  }

  async fetchTags(name_cont) {
    const { data } = await this.$request.get(this.resourceTagURL, { params: { name_cont } })
    return _.map(data, ({ name }) => ({ value: name, label: name }))
  }

  handleFileChange(e) {
    const files = [...e.target.files];
    // 相同文件change事件不会触发
    e.target.value = '';
    if (files.length + this.tableData.length > this.limit) {
      this.$message.error(this.$t('bean.maximumUploadFileCount', { count: this.limit }));
      return;
    }
    const validFiles = files.filter(file => checkFileSize(file, this.size));
    if (validFiles.length !== files.length) {
      this.$message.info(this.$t('bean.filteredUploadFileTip'));
    }
    this.tableData.push(...validFiles.map(file => ({ file })));
  }

  handleUploadBtnClick() {
    this.$refs[this.FILE_INPUT_REF_NAME].click();
  }

  async handleUpload(row, index) {
    const result = await uploadFile(row.file, this.tags);
    this.$set(this.tableData[index], 'result', result);
    return result;
  }

  async handleUploadAll() {
    if (this.needUploadData.length) {
      this.loading = true;
      try {
        await Promise.all(
          this.needUploadData.map(this.handleUpload)
        );
      } finally {
        this.loading = false;
      }
    }
  }

  handleDeleteAll() {
    this.tableData = [];
  }

  @Emit('change')
  handleCloseDialog() {
    return false;
  }

  @Emit('success')
  async handleSubmit() {
    await this.handleUploadAll();
    this.handleCloseDialog();
    return this.tableData.map(item => item.result)
  }

}
</script>

<style scoped>
  .tags-selector {
    margin-top: 20px;
  }
</style>
