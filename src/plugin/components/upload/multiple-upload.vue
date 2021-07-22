<template>
  <el-dialog
    width="70%"
    :visible="value"
    :title="$t('bean.actionUpload')"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    @close="$emit('change', false)"
    @closed="$emit('closed')"
  >
    <div class="admin-multiple-upload" v-loading="loading">
      <AdminForm
        v-if="formColumns.length"
        v-model="uploadForm"
        :columns="formColumns"
        inline
      >
        <template #action>
        </template>
      </AdminForm>

      <input
        type="file"
        multiple
        class="input-file"
        :ref="FILE_INPUT_REF_NAME"
        :accept="accept"
        @change="handleFileChange"
      />

      <input
        type="file"
        multiple
        webkitdirectory
        directory
        class="input-file"
        :ref="DIRECTORY_INPUT_REF_NAME"
        @change="handleDirectoryChange"
      >

      <el-row class="btn-group">
        <el-button type="primary" icon="el-icon-plus" :disabled="tableData.length >= limit" @click="handleUploadBtnClick">{{ $t('bean.actionChooseFile') }}</el-button>
        <el-button v-if="directory" type="primary" icon="el-icon-plus" :disabled="tableData.length >= limit" @click="handleUploadDirectoryBtnClick">{{ $t('bean.actionChooseDirectory') }}</el-button>
        <el-button type="warning" @click="handleUploadAll" :disabled="!needUploadData.length">{{ $t('bean.actionUploadAll') }}</el-button>
        <el-button type="danger" @click="handleDeleteAll" :disabled="!tableData.length">{{ $t('bean.actionRemoveAll') }}</el-button>
      </el-row>

      <el-alert show-icon type="warning" :title="uploadHint" :closable="false"></el-alert>

      <div class="box-table">
        <AdminTable
          :value="tableData"
          :columns="columns"
          :actions="actions"
          :action-column-props="{ width: 200 }"
        />
      </div>
    </div>
    <template #footer>
      <el-button @click="handleCloseDialog" :disabled="loading">{{ $t('bean.actionClose') }}</el-button>
      <el-button type="primary" @click="handleSubmit" :disabled="loading">{{ $t('bean.actionConfirm') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import AdminTable from '../table';
import FormSelect from '../form/select';
import AdminForm from '../form';
import { checkFileSize, uploadFile } from '../../utils';
import _ from 'lodash';
import ImageCropperAction from './image-cropper-action';

@Component({
  components: {
    AdminTable,
    FormSelect,
    AdminForm
  }
})
export default class MultipleUploadDialog extends Vue {
  @Model('change', { type: Boolean }) value;
  @Prop({ type: Number, default: 1 }) limit;
  @Prop({ type: Object }) cropper;
  @Prop({ type: String, default: 'image/*' }) accept;
  @Prop({ type: Number, default: 3 }) size; // 单位M
  @Prop(String) hint; // 提示
  @Prop(Boolean) directory;

  FILE_INPUT_REF_NAME = 'fileInput';
  DIRECTORY_INPUT_REF_NAME = 'fileDirectory';

  uploadForm = {};
  tableData = [];
  loading = false;

  get tagColumns() {
    const requestURL = _.get(this, '$vadminConfig.upload.resourceBlobTagURL');
    const requestFunction = _.get(this, '$vadminConfig.upload.onFetchResourceBlobTag');
    if (requestURL || requestFunction) {
      return {
        prop: 'tags',
        label: this.$t('bean.tag'),
        renderCell: {
          component: 'select',
          hint: this.$t('bean.chooseBlobTagTip'),
          props: {
            clearable: true,
            multiple: true,
            filterable: true,
            'default-first-option': true,
            allowCreate: true,
            xRemoteSearch: async (name) => {
              const params = { name_cont: name };
              const fetchResource = requestFunction || (() => this.$request.get(requestURL, { params }));
              const result = await fetchResource(params);
              const data = _.isArray(result) ? result : _.get(result, 'data', []);
              return data.map(item => ({
                label: item.name,
                value: item.name
              }));
            }
          }
        }
      }
    }
    return null;
  }

  get formColumns() {
    const columns = _.get(this, '$vadminConfig.upload.resourceUploader.formColumns') || [];
    const filterColumns = [...columns];
    if (this.tagColumns) {
      filterColumns.unshift(this.tagColumns);
    }
    return filterColumns;
  }

  get columns() {
    return [
      {
        prop: 'file.name',
        label: this.$t('bean.fileName'),
        renderCell(h, { props: { value, scope: { row } } }) {
          return (
            <a href={window.URL.createObjectURL(row.file)} target="_blank">
              <span>{value}{ row.cropped ? <el-tag style="margin-left: 10px" type="danger">已裁剪</el-tag> : '' }</span>
            </a>
          )
        }
      },
      {
        prop: 'file.size',
        width: 120,
        label: this.$t('bean.fileSize'),
        renderCell(h, { props: { value } }) {
          return <span>{(value / 1024 / 1024).toFixed(3) + 'M'}</span>;
        }
      },
      {
        prop: 'file.type',
        width: 120,
        label: this.$t('bean.fileType'),
      },
      {
        prop: 'result.url',
        width: 120,
        label: this.$t('bean.uploadSuccess'),
        renderCell: 'bool'
      }
    ];
  }

  get cropperHint() {
    if (this.cropper) {
      return `图片裁剪：${this.cropper.width}x${this.cropper.height}`;
    }
    return '';
  }

  get uploadHint() {
    return this.hint ||
      `${this.$t('bean.fileFormat')}：${this.accept}，${this.$t('bean.maximumFileSize', { size: this.size })}M，${this.$t('bean.maximumUploadFileCount', { count: this.limit })}，${this.cropperHint}`
  }

  get needUploadData() {
    return this.tableData.filter(item => !item.result);
  }

  get resourceTagURL() {
    return _.get(this, '$vadminConfig.upload.resourceBlobTagURL');
  }

  get showCropperButton() {
    return _.get(this.cropper, 'width') && this.accept.includes('image');
  }

  handleCropSuccess(file, $index) {
    const name = _.get(this.tableData[$index], 'file.name');
    if (name) {
      file.name = name;
    }
    this.$set(this.tableData, $index, {
      file,
      cropped: true
    });
  }

  actions({ $index, row }) {
    return [
      h => <ImageCropperAction h={h} file={row.file} disabled={row.cropped} cropper={this.cropper} onSuccess={(e) => this.handleCropSuccess(e, $index)} />,
      (h) => <el-button h={h} type="danger" onClick={() => this.tableData.splice($index, 1)}>移除</el-button>
    ].filter(Boolean);
  }

  async fetchTags(name_cont) {
    const { data } = await this.$request.get(this.resourceTagURL, { params: { name_cont } })
    return _.map(data, ({ name }) => ({ value: name, label: name }))
  }

  handleFileChange(e) {
    const files = [...e.target.files];
    // 相同文件change事件不会触发
    e.target.value = '';
    this.putValidFilesToTable(files);
  }

  handleDirectoryChange(e) {
    const files = [...e.target.files]
      .filter(item => !item.name.startsWith('.'))
      .filter(item => {
        if (this.accept === '*') {
          return true;
        }
        return !!item.type.match(this.accept);
      });
    e.target.value = '';
    this.putValidFilesToTable(files);
  }

  putValidFilesToTable(files) {
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

  handleUploadDirectoryBtnClick() {
    this.$refs[this.DIRECTORY_INPUT_REF_NAME].click();
  }

  async handleUpload(row, index) {
    const result = await uploadFile(row.file, { ...this.$attrs, ...this.uploadForm });
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
