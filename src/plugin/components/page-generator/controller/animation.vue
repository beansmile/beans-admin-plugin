<template>
  <AdminForm
    label-width="80px"
    :columns="columns"
    :value="value"
    @change="$emit('change', $event)"
  >
    <template v-slot:action>
      <span />
    </template>
  </AdminForm>
</template>


<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import AdminForm from '../../form';

  @Component({
    components: {
      AdminForm
    }
  })
  export default class PageEditorAnimation extends Vue {
    @Prop({ type: Object, default: () => ({}) }) value;

    get columns() {
      return [
        {
          prop: 'type',
          label: this.$t('bean.pageGenerator.animationType'),
          renderCell: {
            component: 'select',
            props: {
              clearable: true,
              options: [
                {
                  value: 'fade',
                  label: this.$t('bean.pageGenerator.fade')
                },
                {
                  value: 'scale-up',
                  label: this.$t('bean.pageGenerator.scaleUp')
                },
                {
                  value: 'scale-down',
                  label: this.$t('bean.pageGenerator.scaleDown')
                },
                {
                  value: 'slide-top',
                  label: this.$t('bean.pageGenerator.slideTop')
                },
                {
                  value: 'slide-bottom',
                  label: this.$t('bean.pageGenerator.slideBottom')
                },
                {
                  value: 'slide-left',
                  label: this.$t('bean.pageGenerator.slideLeft')
                },
                {
                  value: 'slide-right',
                  label: this.$t('bean.pageGenerator.slideRight')
                },
                {
                  value: 'shake',
                  label: this.$t('bean.pageGenerator.shake')
                }
              ]
            }
          }
        }
      ]
    }
  }
</script>
