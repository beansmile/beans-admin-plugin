<template>
  <div>
    <bean-column-render :renderCell="renderCellHtmlTag" />
    <br>
    <bean-column-render :renderCell="renderCellElementTag" />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class ColumnRenderTag extends Vue {
  renderCellHtmlTag = {
    component: 'div',
    class: 'div',
    style: {
      width: '100px',
      height: '100px',
      backgroundColor: 'red',
      color: '#fff',
      textAlign: 'center'
    },
    domProps: {
      innerHTML: '<span>div</span>'
    },
    on: {
      click() {
        alert('click');
      }
    },
    ref: 'div'
  }

  // renderCellHtmlTag = 'button'; // 不需要设置其他属性时可以直接填组件名称

  renderCellElementTag = {
    component: 'el-button',
    props: {
      type: 'primary',
      size: 'small'
    },
    domProps: {
      innerText: '按钮'
    },
    on: {
      click() {
        alert('click');
      }
    },
    nativeOn: {
      click() {
        alert('nativeOn click');
      }
    },
    ref: 'elementButton'
  }

  mounted() {
    console.log(this.$refs.div);
    console.log(this.$refs.elementButton);
  }
}
</script>
