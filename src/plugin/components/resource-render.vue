<template>
  <div class="admin-resource-render" @click.stop>
    <span v-if="!value">/</span>
    <el-image
      v-else-if="resourceType.includes('image')"
      class="resource-item image"
      :src="value.url"
      v-bind="{ fit: 'contain', previewSrcList: [value.url], ...imageProps, ...$attrs }"
    />
    <video
      v-else-if="resourceType.includes('video')"
      class="resource-item video"
      :src="value.url"
      v-bind="{ controls: true, ...videoProps }"
    />
    <audio
      v-else-if="resourceType.includes('audio')"
      class="resource-item audio"
      :src="value.url"
      v-bind="{ controls: true, ...audioProps }"
    />
    <div v-else class="resource-item attachment">
      <i class="el-icon-document"></i>
      <a
        v-if="showFilename"
        :href="value.url || value"
        style="display: block;"
        download
        target="_blank"
      >
        {{ value.filename || value.url || value }}
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
    @Prop(String) type;
    @Prop(Object) imageProps;
    @Prop(Object) videoProps;
    @Prop(Object) audioProps;
    @Prop({ type: Boolean, default: true }) showFilename;

    get resourceType() {
      if (this.type) {
        return this.type;
      }
      return _.get(this.value, 'content_type') || '';
    }
  }
</script>
