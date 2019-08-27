<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { sourceColumnRender } from './source-render';
import _ from 'lodash';
import { loadingService } from '../services';

@Component
export default class SourceDetail extends Vue {
  @Prop(Array) columns;
  @Prop(Object) scope;
  @Prop({ type: String }) resource;
  @Prop({ type: Object, default: () => ({}) }) data;

  get showColumns() {
    return this.columns.filter(item => (item.action || []).indexOf('hide-in-detail') === -1);
  }

  get detailColumns() {
    return this.showColumns.filter(item => item.prop !== 'action');
  }

  get actionColumn() {
    return this.showColumns.find(item => item.prop === 'action');
  }

  renderCell(column, extra = {}) {
    const scope = this.scope || {
      row: this.data
    };
    const customCellRendered = sourceColumnRender(this.$createElement, { resource: this.resource, ...extra })(
      {
        columns: this.columns,
        column,
        scope
      }
    );
    return customCellRendered || _.get(scope.row, column.prop, '');
  }

  getClass(column) {
    return `item item-${column.prop}`;
  }

  render() {
    const { default: defaultSlot, action: actionSlot } = this.$slots;
    const $actionSlot = actionSlot || defaultSlot;
    return (
      <div class="c-source-detail" v-loading={loadingService.state.count > 0}>
        {
          $actionSlot && (
            <div class="action">
              {$actionSlot}
            </div>
          )
        }
        <div class="content">
          {
            this.detailColumns.map(column => (
              <div class={this.getClass(column)} key={column.prop}>
                <div class="label">{column.label}：</div>
                <div class="value">{this.renderCell(column)}</div>
              </div>
          ))
          }
        </div>
        {
          this.actionColumn && <div class="toolbar-action">{this.renderCell(this.actionColumn, { actionButtonMode: true, actionButtonProps: { type: 'primary' } })}</div>
        }
      </div>
    )
  }
}

</script>

<style lang="less">
  .c-source-detail {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: #606266;
    font-size: 13px;

    .content {
      box-sizing: border-box;
      flex: 1;
      padding: 15px;
      overflow: auto;
      background: #fff;
    }

    .multi-images {
      .preview-image {
        margin-right: 10px;
      }
    }

    .item {
      padding: 15px 0;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      border-bottom: 1px solid #EBEEF5;
      line-height: 1.5;

      .label {
        font-weight: bold;
        min-width: 250px;
      }

      .value {
        flex: 1;

        button {
          padding: 0;
        }
      }
    }

    .toolbar-action {
      margin-top: 15px;
      background: #fff;
      height: 60px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      padding: 0 15px;

      .cell-action {
        display: flex;
        align-items: center;
      }
    }
  }
</style>
