<template>
  <bean-ability can="users.read">
    <span>用户1</span>
  </bean-ability>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Example extends Vue {
}
</script>
