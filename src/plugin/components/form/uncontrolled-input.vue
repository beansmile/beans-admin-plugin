<template>
  <el-input
    v-model="inputValue"
    @change="handleChange"
    v-bind="$attrs"
  />
</template>

<script>
  import { Vue, Component, Watch, Model, Emit } from 'vue-property-decorator';

  @Component
  export default class AdminUncontrolledInput extends Vue {
    @Model('change', { type: [Number, String] }) value;

    inputValue = '';

    @Emit('change')
    handleChange() {
      return this.inputValue;
    }

    @Watch('value', { immediate: true })
    onValueChange(val) {
      this.inputValue = val;
    }
  }
</script>

