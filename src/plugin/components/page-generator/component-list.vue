<template>
  <draggable
    class="page-editor-components-content"
    :sort="false"
    :group="{ name: 'component', pull: 'clone', put: false }"
    :value="components"
  >
    <el-button
      size="medium"
      v-for="(item, index) in components"
      :key="index"
      :icon="item.icon"
      class="component-button-item"
      @click="$emit('add-component', item)"
    >{{ item.title }}</el-button>
  </draggable>
</template>

<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import draggable from 'vuedraggable';

  @Component({
    components: {
      draggable
    }
  })
  export default class ComponentList extends Vue {
    @Prop({ type: Array, default: () => [] }) components;
  }
</script>
