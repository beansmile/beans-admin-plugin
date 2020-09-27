<template>
  <el-dialog
    :visible="value"
    title="上传"
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
        <el-button type="primary" icon="el-icon-plus" :disabled="tableData.length >= limit" @click="handleUploadBtnClick">选择文件</el-button>
        <el-button type="warning" @click="handleUploadAll" :disabled="!needUploadData.length">全部上传</el-button>
        <el-button type="danger" @click="handleDeleteAll" :disabled="!tableData.length">全部移除</el-button>
      </el-row>

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
      <el-button type="primary" @click="handleSubmit">确定</el-button>
      <el-button @click="handleCloseDialog">关闭</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { Vue, Component, Prop, Model, Emit } from 'vue-property-decorator';
import AdminTable from '../table';
import { checkFileSize, uploadFile } from '../../utils';

@Component({
  components: {
    AdminTable
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
  loading = false;

  columns = [
    {
      prop: 'file.name',
      label: '文件名'
    },
    {
      prop: 'file.size',
      label: '文件大小',
      renderCell(h, { props: { value } }) {
        return <span>{(value / 1024 / 1024).toFixed(3) + 'M'}</span>;
      }
    },
    {
      prop: 'file.type',
      label: '文件类型'
    },
    {
      prop: 'result.url',
      label: '上传完成',
      renderCell: 'bool'
    }
  ];

  get uploadHint() {
    return this.hint || `文件格式：${this.accept}，文件最大大小为${this.size}M，最多上传${this.limit}个文件`
  }

  get needUploadData() {
    return this.tableData.filter(item => !item.result);
  }

  actions({ $index }) {
    return [
      (h) => <el-button h={h} type="danger" onClick={() => this.tableData.splice($index, 1)}>移除</el-button>
    ]
  }

  handleFileChange(e) {
    const files = [...e.target.files];
    // 相同文件change事件不会触发
    e.target.value = '';
    if (files.length + this.tableData.length > this.limit) {
      this.$message.error(`最多可上传${this.limit}个文件`);
      return;
    }
    const validFiles = files.filter(file => checkFileSize(file, this.size));
    if (validFiles.length !== files.length) {
      this.$message.info('已过滤不符合要求的文件');
      return;
    }
    this.tableData.push(...validFiles.map(file => ({ file })));
  }

  handleUploadBtnClick() {
    this.$refs[this.FILE_INPUT_REF_NAME].click();
  }

  async handleUpload(row, index) {
    const result = await uploadFile(row.file);
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
