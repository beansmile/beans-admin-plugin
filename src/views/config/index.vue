<template>
  <create-doc
    title="Config"
    :examples="examples"
  />
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';
@Component
export default class Config extends Vue {
  examples = [
    {
      title: '',
      code: require('!raw-loader!./plugin-config.js').default
    }
  ]
}

export const route = [
  {
    path: '/config',
    name: 'config',
    component: Config,
    meta: { title: 'Config' }
  }
]
</script>
