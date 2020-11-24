<template>
  <div class="admin-source-page source-page-form">
    <div class="page-content">
      <p v-if="showLocaleTip && localeName" class="locale-tip" v-html="$t('bean.localeFormTip', { locale: localeName })"></p>
      <AdminForm
        label-width="auto"
        ref="adminForm"
        v-bind="$attrs"
        v-on="$listeners"
        :columns="columns"
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

  get showLocaleTip() {
    return _.get(this.$vadminConfig, 'sourcePage.form.showLocaleTip');
  }

  get localeName() {
    const locale = _.get(this.$route, 'query.locale', '') || this.$i18n.locale;
    const locales = _.get(this.$vadminConfig, 'i18n.locales', {});
    return locales[locale] || locale;
  }

  handleSubmit() {
    this.$refs.adminForm.handleSubmit();
  }
}
</script>
