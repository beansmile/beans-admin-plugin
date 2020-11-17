<template>
  <span v-if="!value">/</span>
  <el-image
    @click.stop
    v-else-if="resourceType.includes('image')"
    class="resource-item image"
    :src="value.url"
    v-bind="{ fit: 'contain', previewSrcList: [value.url], ...imageProps, ...$attrs }"
  />
  <video
    @click.stop
    v-else-if="resourceType.includes('video')"
    class="resource-item video"
    :src="value.url"
    v-bind="{ controls: true, ...videoProps }"
  />
  <a
    @click.stop
    v-else
    class="resource-item attachment"
    :href="value.url || value"
    style="display: block;"
    download
    target="_blank"
  >
    {{ value.filename || value.url || value }}
  </a>
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

    get resourceType() {
      if (this.type) {
        return this.type;
      }
      return _.get(this.value, 'content_type') || '';
    }
  }
</script>

<style lang="scss" scoped>
  .image,
  .video {
    vertical-align: top;
    max-width: 100%;
    max-height: 100%;
  }

  .image {
    width: 100px;
    height: 100px;
  }

  .video {
    width: 200px;
    height: 150px;
  }

  .attachment {
    color: $primary;
  }
</style>

