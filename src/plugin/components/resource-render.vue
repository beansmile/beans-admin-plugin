<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class AdminResourceRender extends Vue {
    @Prop([Object, String]) value;
    @Prop(String) type;

    render() {
      if (!this.value) {
        return null;
      }
      if (this.type === 'image' || /image/.test(this.value.content_type)) {
        return <el-image class="image" src={this.value.url} fit="contain" />
      }
      if (this.type === 'video' || /video/.test(this.value.content_type)) {
        return <video class="video" src={this.value.url} />
      }
      return (
        <a class="attachment" href={this.value.url} style="display: block;" download target="_blank">
          {this.value.filename || this.value.url}
        </a>
      )
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

