<template>
  <c-page-editor
    v-model="pageValue"
    :data="pageData"
    :components="components"
    @submit="handleSubmit"
  />
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example extends Vue {
    pageValue = []
    pageData = {
      links: [
        { 'label': '固定页面', 'options': [{ 'value': '/pages/tabbar/home/home', 'label': '首页' }, { 'value': '/pages/tabbar/mine/mine', 'label': '我的' }, { 'value': '/pages/tabbar/shopping-cart/shopping-cart', 'label': '购物车' }, { 'value': '/pages/products/search/search', 'label': '全部商品列表' }, { 'value': '/pages/feedback/feedback', 'label': '点评/建议' }, { 'value': '/pages/vip/sign-in/sign-in', 'label': '会员注册' }] }
      ],
      productList: [
        { 'id': 2, 'title': '热门推荐' }
      ]
    }
    // TODO 自定义新组件文档
    components = []

    handleSubmit(pageValue) {
      console.log(this.pageValue, pageValue);
    }
  }
</script>
