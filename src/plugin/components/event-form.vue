<template>
  <AdminForm
    v-bind="{ value, columns, 'label-width': 'auto', ...$attrs }"
    v-on="$listeners"
  >
    <template v-slot:action>
      <span />
    </template>
  </AdminForm>
</template>

<script>
import { Vue, Component, Prop, Model } from 'vue-property-decorator';
import AdminForm from './form';
import _ from 'lodash';

@Component({
  components: {
    AdminForm
  }
})
export default class AdminEventForm extends Vue {
  @Model('change', { type: Object, default: () => ({}) }) value;
  // {
  //   link: {
  //     label: '跳转页面',
  //     columns: []
  //   }
  // }
  @Prop({ type: Object, default: () => ({}) }) events;

  get columns() {
    const eventName = _.get(this.value, 'name');
    const eventColumns = _.get(this.events, `${eventName}.columns`) || [];
    return [
      {
        label: this.$t('bean.selectEvent'),
        prop: 'name',
        renderCell: {
          component: 'select',
          domProps: {
            style: 'width: 100%'
          },
          props: {
            clearable: true,
            options: _.map(this.events, ({ label }, value) => ({ label, value }))
          }
        }
      },
      ...eventColumns
    ]
  }
}
</script>
