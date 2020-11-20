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

    columns = [
      {
        prop: 'type',
        label: '动画类型',
        renderCell: {
          component: 'select',
          props: {
            clearable: true,
            options: [
              {
                value: 'fade',
                label: '淡入'
              },
              {
                value: 'scale-up',
                label: '放大'
              },
              {
                value: 'scale-down',
                label: '缩小'
              },
              {
                value: 'slide-top',
                label: '上滑进入'
              },
              {
                value: 'slide-bottom',
                label: '下滑进入'
              },
              {
                value: 'slide-left',
                label: '左滑进入'
              },
              {
                value: 'slide-right',
                label: '右滑进入'
              },
              {
                value: 'shake',
                label: '抖动'
              }
            ]
          }
        }
      }
    ]
  }
</script>
