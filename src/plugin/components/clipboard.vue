<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import ClipboardJS from 'clipboard';
  import { sleep } from '../utils';
  import _ from 'lodash';

  const hideAfter = 1500;

  @Component
  export default class Clipboard extends Vue {
    @Prop(String) text;
    showTip = false;

    debouncedShowTip = _.throttle(() => this.handleShowTip(), hideAfter + 1000, { trailing: false })

    mounted() {
      new ClipboardJS(this.$refs.trigger, {
        text: () => this.text || this.$refs.container.textContent.trim() || ''
      })
      .on('success', this.debouncedShowTip)
    }

    async handleShowTip() {
      this.showTip = true;
      await sleep(hideAfter);
      this.showTip = false;
    }

    render() {
      return (
        <div class="c-clipboard" ref="container">
          {this.$slots.default}
          <el-tooltip
            content="Copied"
            value={this.showTip}
            hide-after={hideAfter}
            manual
          >
            <i ref="trigger" class="el-icon-document-copy icon-copy"></i>
          </el-tooltip>
        </div>
      )
    }
  }
</script>
