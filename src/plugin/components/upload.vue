<template>
  <div class="c-upload" v-loading="loading">
    <el-row class="btn-group">
      <el-button type="primary" class="btn-choose-file" :disabled="this.table.data.length >= limit">
        Select File
        <!-- safari不触发input事件 -->
        <input type="file" @change="handleFileChange" :accept="accept" :multiple="limit > 1" />
      </el-button>
      <el-button type="warning" @click="handleUploadAll" :disabled="!canUploadData.length">Upload All</el-button>
      <el-button type="danger" @click="handleDeleteAll" :disabled="!table.data.length">Remove All</el-button>
    </el-row>

    <el-alert show-icon type="warning" :title="`File Type: ${ accept }, Limited file size is ${ size }M, Up to ${ limit } File(s) ${tip ? '，' + tip : ''}`" :closable="false"></el-alert>

    <c-source-table :table="table" :columns="columns" />

    <el-row class="btn-group">
      <el-button type="primary" @click="onSubmit">Submit</el-button>
      <el-button v-if="showCancelButton" @click="$emit('cancel')">Cancel</el-button>
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
      label: 'File Name'
    },
    {
      prop: 'file.size',
      label: 'File Size',
      renderCell(h, { row }) {
        return (_.get(row, 'file.size') / 1024 / 1024).toFixed(2) + 'M';
      }
    },
    {
      prop: 'file.type',
      label: 'File Type'
    },
    {
      prop: 'src',
      label: 'Done',
      renderCell: 'bool'
    },
    {
      prop: 'action',
      label: 'Action',
      width: 200,
      renderCell: (h, scope) => {
        return (
          <div class="btn-group">
            <el-button type="danger" size="mini" onClick={() => this.handleDelete(scope)}>Remove</el-button>
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
      this.$message.error(`Up to ${this.limit} File(s)`);
      return;
    }

    const fileDataFiltered = [...files]
      .filter(checkSize)
      .map(file => ({ file, src: '' }));

    if (fileDataFiltered.length !== files.length) {
      this.$message.info('Inappropriate files have been filtered');
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
  title = 'Popup',
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
