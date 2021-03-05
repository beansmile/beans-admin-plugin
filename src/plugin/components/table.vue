<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'lodash';
import DialogForm from './form/dialog';

@Component
export default class AdminTable extends Vue {
  @Prop({ type: Array, default: () => [] }) columns;
  @Prop({ type: Array, default: () => [] }) value;
  @Prop({ type: [Function, Array] }) actions;
  @Prop({ type: Object, default: () => ({}) }) actionColumnProps;
  @Prop({ type: Function, default: _.noop }) onTableCellFormSubmit;

  get actionColumn() {
    const ColumnRender = require('./column-render').default;

    if (!this.actions) {
      return null;
    }
    if (_.isArray(this.actions) && this.actions.length <= 0) {
      return null;
    }
    return {
      prop: '_action',
      label: this.$t('bean.actionOperation'),
      fixed: 'right',
      'min-width': 200,
      ...this.actionColumnProps,
      renderCell: (h, context) => {
        const scope = context.props.scope;
        const actions = _.isFunction(this.actions) ? this.actions(scope) : this.actions;
        return (
          <div class="box-action-render">
            {
              actions.map((action, index) => (
                <div class="action" onClick={e => e.stopPropagation()}>
                  <ColumnRender
                    key={index}
                    value={this.value[scope.$index]}
                    scope={scope}
                    renderCell={action}
                    column={action}
                  />
                </div>
              ))
            }
          </div>
        );
      }
    }
  }

  get tableColumns() {
    const columns = this.actionColumn ? this.columns.concat([this.actionColumn]) : this.columns;
    return columns.map(item => (
      {
        'min-width': String(item.label).length * 15 + 20,
        'header-align': 'center',
        align: 'center',
        ...item
      }
    ));
  }

  renderCellForm({ column, scope }) {
    const formColumn = _.isFunction(column.form) ? column.form(scope) : column.form;
    if (formColumn) {
      const formColumns = [
        {
          prop: column.prop,
          label: column.label,
          ...formColumn
        }
      ];
      const submitHandler = async (data) => {
        if (_.isFunction(formColumn.submitHandler)) {
          await formColumn.submitHandler({ data, scope })
        } else {
          await this.onTableCellFormSubmit({ data, scope });
        }
        Object.assign(scope.row, data);
      }
      return (
        <DialogForm
          columns={formColumns}
          value={_.pick(scope.row, column.prop)}
          title={column.label}
          submitHandler={submitHandler}
          label-position="top"
        >
          <el-button
            icon="el-icon-edit"
            size="mini"
            style="margin-left: 5px; padding: 4px"
            circle
          />
        </DialogForm>
      )
    }
    return null;
  }

  renderCell(column) {
    const ColumnRender = require('./column-render').default;
    return scope => {
      return (
        <div class="table-cell">
          <ColumnRender
            key={column.prop}
            value={_.get(scope.row, column.prop)}
            scope={scope}
            column={column}
            renderCell={column.renderCell || (() => <span>{_.get(scope, `row.${column.prop}`, '/')}</span>)}
          />
          {this.renderCellForm({ column, scope })}
        </div>
      )
    }
  }

  renderTableColumn(column) {
    const scopedSlots = {};
    if (column.prop) {
      scopedSlots.default = this.renderCell(column);
    }
    return (
      <el-table-column
        key={column.prop}
        props={_.omit(column, 'renderCell')}
        scopedSlots={scopedSlots}
      />
    );
  }

  render() {
    return (
      <el-table
        class="admin-table"
        data={this.value}
        height="100%"
        stripe
        highlight-current-row
        size="small"
        props={this.$attrs}
        on={this.$listeners}
        scopedSlots={this.$slots}
      >
        {this.tableColumns.map(this.renderTableColumn)}
      </el-table>
    );
  }
}
</script>
