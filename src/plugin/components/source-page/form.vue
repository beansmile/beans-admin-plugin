<template>
  <div class="admin-source-page source-page-form">
    <div class="page-content">
      <AdminForm
        label-width="auto"
        ref="adminForm"
        v-bind="$attrs"
        v-on="$listeners"
        :columns="formColumns"
        :value="value"
        @change="$emit('change', $event)"
      >
        <template #action><span /></template>
      </AdminForm>
    </div>
    <div class="page-footer">
      <el-button type="primary" @click="handleSubmit" :loading="loading">{{ $t('bean.actionSubmit') }}</el-button>
    </div>
  </div>
</template>

<script>
import { Vue, Component, Model, Prop } from 'vue-property-decorator';
import AdminForm from '../form';
import _ from 'lodash';

@Component({
  components: {
    AdminForm
  }
})
export default class AdminSourcePageForm extends Vue {
  @Prop(Boolean) loading;
  @Prop({ type: Array, default: () => [] }) columns;
  @Model('change', { type: Object, default: () => ({}) }) value;

  get formColumns() {
    const { multiLocale } = _.get(this.$vadminConfig, 'sourcePage.form', {});
    if (multiLocale) {
      const locales = _.get(this.$vadminConfig, 'i18n.locales', {});
      return this.columns.map(column => {
        return {
          ...column,
          locales: column.locale === false ? undefined : _.map(locales, (localeLabel, localeName) => {
            return _.merge({}, {
              prop: localeName,
              label: localeLabel
            }, _.get(column, `locale.${localeName}`));
          })
        }
      });
    }
    return this.columns;
  }

  handleSubmit() {
    this.$refs.adminForm.handleSubmit();
  }
}
</script>
