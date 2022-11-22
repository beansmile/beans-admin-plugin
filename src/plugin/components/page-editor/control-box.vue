<template>
  <portal to="page-editor">
    <el-drawer
      custom-class="control-box-drawer"
      :visible="visible"
      @close="$emit('close')"
      :title="title"
    >
      <div class="c-control-box">
        <slot />
      </div>
      <div class="control-box-drawer-footer" v-if="componentKey">
        <el-button icon="el-icon-delete" type="danger" @click="handleDeleteComponent" round>删除组件</el-button>
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
    @Prop(String) componentKey;

    created() {
      const component = this.$mount();
      document.querySelector('body').appendChild(component.$el)
    }

    handleDeleteComponent() {
      this.$root.$emit('page-editor:delete-component', this.componentKey);
    }
  }
</script>
