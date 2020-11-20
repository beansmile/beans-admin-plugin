<template>
  <draggable
    class="components-content"
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

<style lang="scss" scoped>
  .components-content {
    display: flex;
    flex-wrap: wrap;
    margin-right: -20px;
    overflow: hidden;

    .component-button-item {
      width: 44%;
      height: 90px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: 0;
      margin-bottom: 20px;
      margin-right: 5%;
      font-size: 16px;

      /deep/ i {
        font-size: 20px;
        margin-bottom: 15px;
      }

      /deep/ i.iconfont.icon-daohangtiao {
        font-size: 15px;
      }
    }
  }
</style>
