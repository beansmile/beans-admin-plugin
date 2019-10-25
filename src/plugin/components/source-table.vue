<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import { sourceColumnRender } from './source-render';
import _ from 'lodash';
import { loadingService } from '../services';

@Component
export default class SourceTable extends Vue {
  @Prop({ type: Object, default: () => ({ data: [] }) }) table;
  @Prop({ type: Array, default: () => [] }) columns;
  @Prop(String) resource;
  @Prop(Number) tableHeight;

  get tableColumns() {
    return this.columns
      .map(item => {
        return {
          ...item,
          sortable: item.sort ? 'custom' : false,
          'sort-orders': ['ascending', 'descending', null]
        }
      })
      .filter(item => !(item.action || []).includes('hide-in-table'))
      .map(item => ({ ...item, prop: item.prop && String(item.prop) }));
  }

  getRowByPropName(propName) {
    return this.columns.find(item => item.prop === propName);
  }

  getTableComponent() {
    return this.$refs.table;
  }

  handleSortChange({ order, prop }) {
    const { ascending, descending } = _.get(this.$appConfig, 'table.sort', {});
    const query = Object.assign({}, this.$route.query, { page: 1 });
    if (order) {
      _.set(query, '_sort_field', prop);
      _.set(query, '_sort_value', order);
      const row = this.getRowByPropName(prop);
      const sortQueryKey = row.sort;
      const sortQueryValue = {
        ascending,
        descending
      }[order];
      _.set(query, sortQueryKey, `${prop} ${sortQueryValue}`);
    } else {
      const currentSortField = _.get(query, '_sort_field');
      const row = this.getRowByPropName(currentSortField);
      const sortQueryKey = row.sort;
      _.set(query, '_sort_field', undefined);
      _.set(query, '_sort_value', undefined);
      _.set(query, sortQueryKey, undefined);
    }
    this.$router.replace({ query });
  }

  get defaultSort() {
    const query = _.get(this, '$route.query');
    const sortProp = _.get(query, '_sort_field');
    const sortValue = _.get(query, '_sort_value');
    return {
      prop: sortProp,
      order: sortValue
    }
  }

  renderScopedSlots(column) {
    if (!column.prop) {
      return null;
    }
    return {
      default: (scope) => sourceColumnRender(this.$createElement, { resource: this.resource })(
        {
          columns: this.columns,
          column,
          scope
        }
      )
    }
  }

  render() {
    const { table, tableColumns } = this;

    return (
      <div class="c-source-table" v-loading={loadingService.state.count > 0}>
        <el-table
          class="el-table--scrollable-y"
          default-sort={this.defaultSort}
          onsort-change={this.handleSortChange}
          props={table}
          on={table.events}
          height={this.tableHeight}
          ref="table"
        >
          {
            tableColumns.map((column, index) =>
              <el-table-column
                align="center"
                props={column}
                scopedSlots={this.renderScopedSlots(column, index)}
              />
            )
          }
        </el-table>
      </div>
    )
  }
}
</script>
