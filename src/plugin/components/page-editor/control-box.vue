<template>
  <portal to="page-editor">
    <el-drawer
      custom-class="admin-page-editor-control-box-drawer"
      :visible="visible"
      @close="$emit('close')"
      :title="title"
    >
      <div class="admin-control-box">
        <slot />
      </div>
    </el-drawer>
  </portal>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class controlBox extends Vue {
    @Prop(Boolean) visible;
    @Prop(String) title;

    created() {
      const component = this.$mount();
      document.querySelector('body').appendChild(component.$el)
    }
  }
</script>
