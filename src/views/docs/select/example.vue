<template>
  <div>
    <div>
      <c-select v-model="value" :options="options" />
    </div>

    <div>
      <h2>xRemotePreload</h2>
      <c-select v-model="value" :x-remote-preload="xRemotePreload" />
    </div>

    <div>
      <h2>xRemoteSearch</h2>
      <c-select v-model="value" :options="options" :x-remote-search="xRemoteSearch" />
    </div>
  </div>
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Example extends Vue {
    value = '1'

    options = [
      {
        label: '选项1',
        value: '1'
      },
      {
        label: '选项2',
        value: '2'
      }
    ]

    xRemotePreload() {
      return Promise.resolve(this.options);
    }

    xRemoteSearch(keyword) {
      console.log(keyword);
      return Promise.resolve(this.options);
    }
  }
</script>
