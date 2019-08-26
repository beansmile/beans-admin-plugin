<template>
  <div class="c-upload" v-loading="loading">
    <el-row class="btn-group">
      <el-button type="primary" class="btn-choose-file" :disabled="this.table.data.length >= limit">
        选择文件
        <input type="file" @input="handleFileChange" :accept="accept" :multiple="limit > 1" />
      </el-button>
      <el-button type="warning" @click="handleUploadAll" :disabled="!canUploadData.length">全部上传</el-button>
      <el-button type="danger" @click="handleDeleteAll" :disabled="!table.data.length">全部移除</el-button>
    </el-row>

    <el-alert show-icon type="warning" :title="`文件格式：${ accept }，文件最大大小为${ size }M，最多上传${ limit }个文件${tip ? '，' + tip : ''}`" :closable="false"></el-alert>

    <c-source-table :table="table" :columns="columns" />

    <el-row class="btn-group">
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button v-if="showCancelButton" @click="$emit('cancel')">取消</el-button>
    </el-row>
  </div>
</template>

<script>
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import _ from 'lodash';
import { createDialog } from '../utils';

@Component
export default class Upload extends Vue {
  @Prop({ type: Number, default: 1 }) limit;
  @Prop({ type: String, default: 'image/*' }) accept;
  @Prop({ type: Number, default: 3 }) size; // 单位M
  @Prop({ type: String, default: '' }) tip;
  @Prop({ type: Boolean, default: true }) showCancelButton;

  loading = false;

  table = {
    data: [],
    'max-height': undefined
  }

  columns = [
    {
      prop: 'file.name',
      label: '文件名'
    },
    {
      prop: 'file.size',
      label: '文件大小',
      renderCell(h, { row }) {
        return (_.get(row, 'file.size') / 1024 / 1024).toFixed(2) + 'M';
      }
    },
    {
      prop: 'file.type',
      label: '文件类型'
    },
    {
      prop: 'src',
      label: '上传完成',
      renderCell: 'bool'
    },
    {
      prop: 'action',
      label: '操作',
      width: 200,
      renderCell: (h, scope) => {
        return (
          <div class="btn-group">
            <el-button type="danger" size="mini" onClick={() => this.handleDelete(scope)}>移除</el-button>
          </div>
        )
      }
    }
  ]

  @Emit('submit')
  async onSubmit() {
    if (this.canUploadData.length) {
      await this.handleUploadAll();
    }
    return this.table.data
      .filter(item => item.src)
      .map(item => item.src);
  }

  handleFileChange(e) {
    const files = e.target.files;
    const checkSize = (file) => file.size <= this.size * 1024 * 1024;

    if (files.length + this.table.data.length > this.limit) {
      this.$message.error(`最多可上传${this.limit}个文件`);
      return;
    }

    const fileDataFiltered = [...files]
      .filter(checkSize)
      .map(file => ({ file, src: '' }));

    if (fileDataFiltered.length !== files.length) {
      this.$message.info('已过滤不符合要求的文件');
    }

    this.table.data.push(...fileDataFiltered);

    e.target.value = '';
  }

  upload(file, qiniuMeta) {
    return this.$upload(file, qiniuMeta);
  }

  async handleUpload(row, index) {
    const fileUrl = await this.upload(row.file);
    this.$set(this.table.data[index], 'src', fileUrl);
  }

  async handleUploadAll() {
    this.loading = true;
    try {
      await Promise.all(this.table.data.map((row, index) => !row.src && this.handleUpload(row, index)));
    } finally {
      this.loading = false;
    }
  }

  get canUploadData() {
    return this.table.data.filter(item => !item.src);
  }

  handleDelete(scope) {
    this.$delete(this.table.data, scope.$index);
  }

  handleDeleteAll() {
    this.$set(this.table, 'data', []);
  }
}

export const createUploadDialog = (h, {
  title = '弹窗',
  limit,
  accept,
  size,
  onConfirm,
  onClose,
  ...opts
} = {}) => {
  const uploadComponent = <Upload limit={limit} accept={accept} size={size} />
  const slots = { default: uploadComponent }
  const props = { title, top: '0', ...opts, customClass: `upload-dialog ${opts.customClass || ''}` }
  const events = {
    close: instance => {
      instance.visible = false;
      onClose && onClose();
    },
    opened: instance => {
      const { componentInstance } = uploadComponent;
      componentInstance.$on('cancel', () => {
        instance.visible = false;
        onClose && onClose();
      });
      componentInstance.$on('submit', async (data) => {
        if (onConfirm) {
          await onConfirm(data);
        }
        instance.visible = false;
      });
    }
  }
  return createDialog({
    slots,
    props,
    events
  });
}

</script>

<style lang="less" scoped>
  .c-upload {
    height: 100%;
    display: flex;
    flex-direction: column;

    .btn-group {
      flex-shrink: 0;
    }

    .el-alert {
      margin-top: 20px;
      flex-shrink: 0;
    }

    .c-source-table {
      margin: 20px 0;
      flex: 1;
    }

    .btn-choose-file {
      position: relative;

      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
      }
    }
  }
</style>
