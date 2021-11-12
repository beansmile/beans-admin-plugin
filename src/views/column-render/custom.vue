<template>
  <div>
    <bean-column-render attr1="attr1" :renderCell="renderCell" />
    <br>
    <bean-column-render :renderCell="renderCellObject" />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class ColumnRenderTag extends Vue {

  handleClick() {
    alert('handleClick');
  }

  renderCell = (h, context) => {
    // attr1值
    console.log(context.props.attr1);
    return <div
      ref="div1"
      onClick={() => alert('div')}
      style={{ width: '100px',
        height: '100px',
        backgroundColor: 'red',
        color: '#fff',
        textAlign: 'center'
      }}
      class="test"
    >div</div>
  }

  // 和上面的效果一样
  renderCellObject = {
    component: this.renderCell
  }

  mounted() {
    console.log(this.$refs.div1, 'div1');
  }
}
</script>
