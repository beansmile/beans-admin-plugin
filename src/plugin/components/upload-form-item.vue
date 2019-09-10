<template>
  <div class="upload-form-item">
    <div class="resource-content" :class="{ column: type !== 'image' || type !== 'video' }">
      <template v-for="(item, index) in filesResouces">
        <div class="item-resource item-image" v-if="type === 'image'" :key="index">
          <i class="el-icon-close btn-close" @click="handleDelete(index)"></i>
          <c-preview-image :current="item">
            <img class="image" :src="item"/>
          </c-preview-image>
        </div>
        <div class="item-resource item-video" v-else-if="type === 'video'" :key="index">
          <el-button class="btn-close" size="mini" type="danger" icon="el-icon-delete" circle
                     @click="handleDelete(index)"></el-button>
          <video class="video" :src="item"/>
        </div>
        <div v-else :key="index" style="width: 100%">
          <a :href="item" style="display: block;" class="download-url" download>{{
            item.split('/').pop() }}</a>
        </div>
      </template>
    </div>
    <el-button type="primary" @click="handleShow" :disabled="isMultiple && filesResouces.length >= limit">上传<i
      class="el-icon-upload el-icon--right"></i></el-button>

    <el-dialog
      v-if="show"
      :visible="visible"
      append-to-body
      title="上传"
      custom-class="upload-dialog"
      @close="handleHide"
      @closed="handleClosed"
    >
      <c-upload
        v-bind="$attrs"
        :limit="isMultiple ? limit - filesResouces.length : 1"
        @submit="handleSubmit"
        @cancel="handleHide"
      />
    </el-dialog>
  </div>
</template>

<script>
  import { Vue, Component, Prop, Model } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class UploadFormItem extends Vue {
    @Prop({ type: Number, default: 1 }) limit;
    @Prop({ type: String, default: 'image' }) type;
    @Model('change', { type: [Array, String] }) value;

    visible = false;
    show = true;

    get filesResouces() {
      return this.value ? _.flatten([this.value]) : [];
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
        this.$emit('change', this.limit > 1 ? this.filesResouces.concat(data) : data[0]);
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
