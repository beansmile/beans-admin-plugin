<template>
  <div class="admin-form-upload">
    <Upload
      :disabled="disabled || uploadLimit < 1"
      :limit="uploadLimit"
      :cropper="cropper"
      :accept="accept"
      :size="size"
      v-bind="$attrs"
      @success="handleSuccess"
    />
    <draggable
      :value="fileResources"
      class="resource-content"
      @end="handleDragChange"
      v-if="fileResources.length"
    >
      <template v-for="(item, index) in fileResources">
        <div class="item-resource item-image" v-if="(item.contentType || '').match(/image/)" :key="index">
          <el-button v-if="!disabled" size="mini" circle class="btn-close" icon="el-icon-delete" @click.stop="handleDelete(index)"></el-button>
          <el-image :src="item.url" class="image" :preview-src-list="fileResources.map(fr => fr.url)" fit="contain" />
        </div>
        <div class="item-resource item-video" v-else-if="(item.contentType || '').match(/video/)" :key="index">
          <el-button v-if="!disabled && item.url" size="mini" circle class="btn-close" icon="el-icon-delete" @click.stop="handleDelete(index)"></el-button>
          <video class="video" :src="item.url"/>
        </div>
        <div v-else :key="index" style="width: 100%">
          <a :href="item.url" class="download-url" download>{{ item.filename }}</a>
          <el-button v-if="!disabled && item.url" size="mini" circle class="btn-close" style="margin-left: 10px;" icon="el-icon-delete" @click.stop="handleDelete(index)"></el-button>
        </div>
      </template>
    </draggable>
    <div v-if="fileResources.length > 1" class="drag-tip">可拖拽排序</div>
  </div>
</template>

<script>
import { Vue, Component, Model, Prop, Emit, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import draggable from 'vuedraggable';
import Upload from '../upload';
import { arrayMove } from '../../utils';

const FILE_MAP_SESSION_KEY_NAME = 'upload_file_map';

@Component({
  components: {
    Upload,
    draggable
  }
})
export default class AdminFormUpload extends Vue {
  @Model('change', { type: [Array, String, Number, Object] }) value;
  @Prop(Boolean) disabled;
  @Prop({ type: Number, default: 1 }) limit;
  @Prop({ type: Object }) cropper;
  @Prop({ type: String, default: 'image/*' }) accept;
  @Prop({ type: Number, default: 3 }) size; // 单位M
  @Prop({ type: String, default: 'signedId' }) trackedBy;

  transformValue = _.once(({ value, trackedBy, callback }) => {
    if (_.isArray(value)) {
      if (_.isPlainObject(value[0])) {
        value.forEach(item => {
          const key = item[trackedBy];
          sessionStorage.setItem(`${FILE_MAP_SESSION_KEY_NAME}_${key}`, JSON.stringify(item));
        });
        callback(value.map(item => item[trackedBy]));
      }
    } else {
      if (_.isPlainObject(value)) {
        const key = value[trackedBy];
        sessionStorage.setItem(`${FILE_MAP_SESSION_KEY_NAME}_${key}`, JSON.stringify(value));
        callback(key);
      }
    }
  });

  get uploadLimit() {
    if (this.limit > 1) {
      return this.limit - (this.value || []).length;
    }
    return 1;
  }

  get fileResources() {
    const value = this.value ? _.flatten([this.value]) : [];
    return value.map(item => {
      if (_.isString(item) || _.isNumber(item)) {
        return JSON.parse(sessionStorage.getItem(`${FILE_MAP_SESSION_KEY_NAME}_${item}`));
      }
      return item;
    });
  }

  @Watch('value', { immediate: true })
  onValueChange(value) {
    if (value) {
      this.transformValue({
        trackedBy: this.trackedBy,
        value,
        callback: this.handleSyncValue
      });
    }
  }

  @Emit('change')
  handleSyncValue(data) {
    return data;
  }

  handleSuccess(data) {
    const dataList = _.flatten([data]);
    dataList.forEach(item => {
      const key = item[this.trackedBy];
      sessionStorage.setItem(`${FILE_MAP_SESSION_KEY_NAME}_${key}`, JSON.stringify(item));
    });
    const ids = dataList.map(item => item[this.trackedBy]);
    this.handleSyncValue(this.limit > 1 ? (this.value || []).concat(...ids) : ids[0]);
  }

  @Emit('change')
  handleDelete(index) {
    if (_.isArray(this.value)) {
      return this.value.filter((v, i) => i !== index);
    }
    return '';
  }

  handleDragChange({ oldIndex, newIndex }) {
    if (oldIndex !== newIndex) {
      this.$emit('change', arrayMove(this.value, oldIndex, newIndex));
    }
  }

}
</script>
