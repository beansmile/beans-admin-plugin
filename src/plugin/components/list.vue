<script>
import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'lodash';
import { screenService } from '../services';

@Component
export default class AdminList extends Vue {
  @Prop({ type: Array, default: () => [] }) columns;
  @Prop({ type: Object }) value;

  get defaultLabelWidth() {
    return screenService.isMobile ? '80px' : '150px';
  }

  get locales() {
    const locales = _.get(this.$vadminConfig, 'i18n.locales', {});
    const locale = _.get(this.$i18n, 'locale');
    const localesArr = _.map(locales, (localeLabel, lacaleValue) => ({ label: localeLabel, locale: lacaleValue }));
    const currentIndex = localesArr.findIndex(item => item.locale === locale);
    // 当前语言排在第一个
    localesArr.unshift(localesArr.splice(currentIndex, 1)[0]);
    return localesArr;
  }

  renderCellDispatcher(column) {
    if (column.locale) {
      if (this.locales.length) {
        return (
          <el-form-item class="form-item-lang" label={column.label}>
            {
              this.locales.map(item => {
                const localeColumn = _.merge({ labelWidth: '80px' }, column, { prop: `${column.prop}_${item.locale}`, label: item.label }, _.get(column.locale, item.locale, {}));
                return this.renderCell(localeColumn);
              })
            }
          </el-form-item>
        )
      }
    }
    return this.renderCell(column);
  }

  renderCell(column) {
    const ColumnRender = require('./column-render').default;
    const value = _.get(this.value, column.prop);
    const renderCell = column.renderCell || (() => <div>{_.isNil(value) ? '/' : value}</div>);
    return (
      <el-form-item class={column.prop} label-width={column.defaultLabelWidth || this.defaultLabelWidth} label={column.label} key={column.prop}>
        <ColumnRender
          value={value}
          scope={{ row: this.value }}
          renderCell={renderCell}
          column={column}
        />
      </el-form-item>
    )
  }

  render() {
    return (
      <el-form class="el-form-show" label-width={this.defaultLabelWidth} label-position="left" props={this.$attrs}>
        {this.columns.map(this.renderCellDispatcher)}
      </el-form>
    );
  }
}
</script>
