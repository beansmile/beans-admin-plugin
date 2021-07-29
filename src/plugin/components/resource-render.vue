<template>
  <div class="admin-resource-render" @click.stop>
    <span v-if="!resourceUrl">/</span>
    <el-image
      v-else-if="resourceType.includes('image')"
      class="resource-item image"
      :src="resourceUrl"
      v-bind="{ fit: 'contain', previewSrcList: [resourceUrl], ...imageProps, ...$attrs }"
    />
    <video
      v-else-if="resourceType.includes('video')"
      class="resource-item video"
      :src="resourceUrl"
      v-bind="{ controls: true, ...videoProps }"
    />
    <audio
      v-else-if="resourceType.includes('audio')"
      class="resource-item audio"
      :src="resourceUrl"
      v-bind="{ controls: true, ...audioProps }"
    />
    <div v-else class="resource-item attachment">
      <i class="el-icon-document"></i>
      <a
        v-if="showFilename"
        :href="resourceUrl"
        style="display: block;"
        download
        target="_blank"
      >
        {{ resourceFilename }}
      </a>
    </div>
  </div>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class AdminResourceRender extends Vue {
    @Prop([Object, String]) value;
    @Prop({ type: [Array, String] }) type;
    @Prop(String) filename;
    @Prop(String) url;
    @Prop(Object) imageProps;
    @Prop(Object) videoProps;
    @Prop(Object) audioProps;
    @Prop({ type: Boolean, default: true }) showFilename;

    get resourceType() {
      if (_.isArray(this.type)) {
        return _.get(this.value, 'content_type') || '';
      }
      return this.type || _.get(this.value, 'content_type') || '';
    }

    get resourceUrl() {
      return this.url || _.get(this.value, 'url', this.value)
    }

    get resourceFilename() {
      const { filename, url = this.url } = _.pick(this.value, ['filename', 'url'])
      return this.filename || filename || url || this.value;
    }
  }
</script>
