<template>
  <div class="c-upload" v-loading="loading">
    <el-row class="btn-group">
      <el-button type="primary" class="btn-choose-file" :disabled="this.table.data.length >= limit">
        {{ $t('选择文件') }}
        <!-- safari不触发input事件 -->
        <input type="file" @change="handleFileChange" :accept="accept" :multiple="limit > 1" />
      </el-button>
      <el-button type="warning" @click="handleUploadAll" :disabled="!canUploadData.length">{{ $t('全部上传') }}</el-button>
      <el-button type="danger" @click="handleDeleteAll" :disabled="!table.data.length">{{ $t('全部移除') }}</el-button>
    </el-row>

    <el-alert show-icon type="warning" :title="alert_title" :closable="false"></el-alert>

    <c-source-table :table="table" :columns="columns" />

    <el-row class="btn-group">
      <el-button type="primary" @click="onSubmit">{{ $t('确定') }}</el-button>
      <el-button v-if="showCancelButton" @click="$emit('cancel')">{{ $t('取消') }}</el-button>
    </el-row>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'lodash';
import { i18n } from '../i18n';
import { createDialog, getImageInfo } from '../utils';

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
      label: i18n.t('文件名')
    },
    {
      prop: 'file.size',
      label: i18n.t('文件大小'),
      renderCell(h, { row }) {
        return (_.get(row, 'file.size') / 1024 / 1024).toFixed(2) + 'M';
      }
    },
    {
      prop: 'file.type',
      label: i18n.t('文件类型')
    },
    {
      prop: 'src',
      label: i18n.t('上传完成'),
      renderCell: 'bool'
    },
    {
      prop: 'action',
      label: i18n.t('操作'),
      width: 200,
      renderCell: (h, scope) => {
        return (
          <div class="btn-group">
            <el-button type="danger" size="mini" onClick={() => this.handleDelete(scope)}>{i18n.t('移除')}</el-button>
          </div>
        )
      }
    }
  ]

  get alert_title() {
    return this.$t('上传提示', this) + (this.tip ? '，' + this.tip : '')
  }

  async onSubmit() {
    if (this.canUploadData.length) {
      await this.handleUploadAll();
    }
    const data = await this.table.data.filter(item => item.src)
    this.$emit('submit', data.map(item => item.src));
    this.$emit('change', JSON.parse(JSON.stringify(data)));
  }

  handleFileChange(e) {
    const files = e.target.files;
    const checkSize = (file) => file.size <= this.size * 1024 * 1024;
    if (files.length + this.table.data.length > this.limit) {
      this.$message.error(this.$t('最多可上传n个文件', this));
      return;
    }

    const fileDataFiltered = [...files]
      .filter(checkSize)
      .map(file => ({ file, src: '' }));

    if (fileDataFiltered.length !== files.length) {
      this.$message.info(i18n.t('已过滤不符合要求的文件'));
    }

    this.table.data.push(...fileDataFiltered);

    e.target.value = '';
  }

  upload(file, qiniuMeta) {
    return this.$upload(file, qiniuMeta);
  }

  async handleUpload(row, index) {
    const setImagInfo = async (file) => {
      if (file.type.startsWith('image')) {
        try {
          const res = await getImageInfo(URL.createObjectURL(file));
          this.$set(this.table.data[index], 'width', res.width);
          this.$set(this.table.data[index], 'height', res.height);
        // eslint-disable-next-line no-empty
        } catch (e) {}
      }
    }

    const [fileUrl] = await Promise.all([
      this.upload(row.file),
      setImagInfo(row.file)
    ]);
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
  title = i18n.t('弹窗'),
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
