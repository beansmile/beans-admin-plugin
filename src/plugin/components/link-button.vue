<template>
  <c-router-link :to="to" v-bind="linkProps">
    <el-button type="text" v-bind="ButtonProps"><slot /></el-button>
  </c-router-link>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class LinkButton  extends Vue {
  @Prop([Object, String]) to;
  @Prop(Object) linkProps;
  @Prop(Object) ButtonProps;
}
</script>
