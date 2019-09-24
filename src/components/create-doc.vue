<template>
  <div class="page">
    <h2 class="title">{{ title }}</h2>
    <h3>Attributes</h3>
    <c-source-table
      :table="{ data: attributes }"
      :columns="attributesColumn"
    />
    <h3>Events</h3>
    <c-source-table
      :table="{ data: events }"
      :columns="eventsColumn"
    />
    <h3>Examples</h3>
    <div class="example" v-for="(item, index) in examples" :key="index">
      <h3>{{ item.title }}</h3>
      <div class="example-exec">
        <v-node :render-node="compile(item.code)" />
      </div>
      <c-clipboard class="example-clipboard">
        <code>{{ item.code }}</code>
      </c-clipboard>
    </div>
  </div>
</template>


<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class CreateDoc extends Vue {
    @Prop(String) title;
    @Prop(String) code;
    @Prop(Array) attributes;
    @Prop(Array) events;
    @Prop(Array) examples;

    attributesColumn = [
      {
        prop: 'prop',
        label: '参数'
      },
      {
        prop: 'desc',
        label: '说明'
      },
      {
        prop: 'type',
        label: '类型'
      },
      {
        prop: 'optionalValue',
        label: '可选值'
      },
      {
        prop: 'defaultValue',
        label: '默认值'
      }
    ]

    eventsColumn = [
      {
        prop: 'name',
        label: '事件名称'
      },
      {
        prop: 'desc',
        label: '说明'
      },
      {
        prop: 'args',
        label: '回调参数'
      }
    ]

    compile(code) {
      return Vue.compile(code).render
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    code {
      display: block;
      background: #000;
      color: #fff;
      padding: 15px;
      font-size: 16px;
    }

    .example {
      margin-bottom: 50px;
    }

    .example-exec {
      padding: 15px;
      background: #fff;
      margin-bottom: 10px;
    }

    .example-clipboard {
      position: relative;

      /deep/ .icon-copy {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 20px;
        color: #fff;
      }
    }
  }
</style>
