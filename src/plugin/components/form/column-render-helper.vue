<template>
  <ColumnRender
    :value="columnValue"
    :scope="scope"
    :column="column"
    :renderCell="renderCell"
    @input="handleInput"
    v-on="$listeners"
  />
</template>

<script>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import ColumnRender from '../column-render';

@Component({
  components: {
    ColumnRender
  }
})
export default class ColumnRenderHelper extends Vue {
  @Prop([String, Number, Object, Array, Boolean]) value;
  @Prop(Object) scope;
  @Prop(Object) column;
  @Prop([Object, String, Function]) renderCell;

  columnValue = null;

  handleInput(e) {
    this.columnValue = e;
  }

  @Watch('value', { immediate: true })
  onValueChange(val) {
    this.columnValue = val;
  }
}
</script>
