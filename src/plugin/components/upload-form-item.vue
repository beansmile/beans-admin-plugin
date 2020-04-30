<template>
  <div class="upload-form-item">
    <draggable
      :value="filesResouces"
      class="resource-content"
      :class="{ column: type !== 'image' || type !== 'video' }"
      @end="handleDragChange"
    >
      <template v-for="(item, index) in filesResouces">
        <div class="item-resource item-image" v-if="type === 'image'" :key="index">
          <i class="el-icon-close btn-close" @click="handleDelete(index)"></i>
          <el-image :src="item" class="image" fit="cover" />
        </div>
        <div class="item-resource item-video" v-else-if="type === 'video'" :key="index">
          <i class="el-icon-close btn-close" @click="handleDelete(index)"></i>
          <video class="video" :src="item"/>
        </div>
        <div v-else :key="index" style="width: 100%">
          <a :href="item" style="display: block;" class="download-url" download>{{
            item.split('/').pop() }}</a>
        </div>
      </template>
    </draggable>
    <div v-if="filesResouces.length > 1" class="drag-tip">可拖拽排序</div>
    <el-button type="primary" @click="handleShow" :disabled="isMultiple && filesResouces.length >= limit">{{ $t('上传') }}<i
      class="el-icon-upload el-icon--right"></i></el-button>

    <el-dialog
      v-if="show"
      :visible="visible"
      append-to-body
      :title="$t('上传')"
      custom-class="upload-dialog"
      @close="handleHide"
      @closed="handleClosed"
    >
      <c-upload
        v-bind="$attrs"
        :limit="isMultiple ? limit - filesResouces.length : 1"
        @change="handleSubmit"
        @cancel="handleHide"
      />
    </el-dialog>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model } from 'vue-property-decorator';
  import _ from 'lodash';
  import { arrayMove } from '../utils';
  import draggable from 'vuedraggable';

  @Component({
    components: {
      draggable
    }
  })
  export default class UploadFormItem extends Vue {
    @Prop({ type: Number, default: 1 }) limit;
    @Prop({ type: String, default: 'image' }) type;
    @Model('change', { type: [Array, String] }) value;

    visible = false;
    show = true;

    get filesResouces() {
      return this.value ? _.flatten([this.value]) : [];
    }

    handleDragChange({ oldIndex, newIndex }) {
      if (oldIndex !== newIndex) {
        const filesResoucesSorted = arrayMove(this.filesResouces, oldIndex, newIndex);
        this.$emit('change', this.limit > 1 ? filesResoucesSorted : filesResoucesSorted[0]);
      }
    }

    handleShow() {
      this.visible = true;
    }

    handleHide() {
      this.visible = false;
    }

    handleClosed() {
      this.show = false;
      this.$nextTick(() => this.show = true);
    }

    handleSubmit(data) {
      this.handleHide();
      if (data.length) {
        const dataSrcArr = data.map(item => item.src);
        this.$emit('change', this.limit > 1 ? this.filesResouces.concat(dataSrcArr) : dataSrcArr[0]);
        this.$emit('submit', data);
      }
    }

    get isMultiple() {
      return this.limit > 1;
    }

    handleDelete(index) {
      let value = ''
      if (_.isArray(this.value)) {
        value = this.value.filter((v, i) => i !== index)
      }
      this.$emit('change', value)
    }
  }
</script>
