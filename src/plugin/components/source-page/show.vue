<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import ColumnRender from '../column-render';
import _ from 'lodash';

@Component
export default class AdminSourcePageShow extends Vue {
  @Prop({ type: Array, default: () => [] }) columns;
  @Prop({ type: [Function, Array], default: () => [] }) actions;
  @Prop({ type: Object }) value;

  get allActions() {
    if (_.isEmpty(this.value)) {
      return [];
    }
    if (_.isArray(this.actions)) {
      return this.actions;
    }
    if (_.isFunction(this.actions)) {
      return this.actions({ row: this.value });
    }
    return [];
  }

  renderCell(column) {
    const value = _.get(this.value, column.prop);
    const renderCell = column.renderCell || (() => <div>{value}</div>);
    return (
      <el-form-item class={column.prop} label={column.label} key={column.prop}>
        {
          _.isNil(value) ? <span>/</span> : (
            <ColumnRender
              value={value}
              scope={{ row: this.value }}
              renderCell={renderCell}
              column={column}
            />
          )
        }
      </el-form-item>
    )
  }

  renderAction(action, index) {
    if (!action) {
      return null;
    }
    return (
      <div class="action">
        <ColumnRender
          key={index}
          value={this.value}
          scope={{ row: this.value }}
          renderCell={action}
          column={action}
        />
      </div>
    )
  }

  render() {
    return (
      <div class="admin-source-page source-page-show">
        <div class="page-content">
          <el-form label-width="150px" label-position="left" props={this.$attrs}>
            {this.columns.map(this.renderCell)}
          </el-form>
        </div>
        {
          this.allActions.length > 0 && (
            <div class="page-footer">
              <div class="box-action-render">
                {this.allActions.map(this.renderAction)}
              </div>
            </div>
          )
        }
      </div>
    )
  }
}
</script>
