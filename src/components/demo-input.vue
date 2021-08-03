<template>
  <div class="demo-input">
    <p>input值: {{ value }}</p>
    <el-input :value="value" @input="handleInput" v-on="$listeners"></el-input>
    <slot name="slot1" :value="value" />
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class DemoInput extends Vue {
  @Prop() value;

  handleInput(e) {
    console.log(e);
    this.$emit('change', e);
  }
}
</script>

<style lang="scss" scoped>


</style>
