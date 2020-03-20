<template>
  <div class="page">
    <h2 class="title">{{ title }}</h2>
    <slot />
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
        <v-node v-if="item.example" :render-node="item.example" />
        <v-node v-else :render-node="compile(item.code)" />
      </div>
      <c-clipboard class="example-clipboard">
        <pre class="code">{{ item.code }}</pre>
      </c-clipboard>
    </div>
  </div>
</template>


<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';

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
        label: 'Argument'
      },
      {
        prop: 'desc',
        label: 'Description',
        renderCell: (h, { row }) => {
          if (_.isFunction(row.desc)) {
            return row.desc(h, { row });
          }
          return row.desc;
        }
      },
      {
        prop: 'type',
        label: 'Type'
      },
      {
        prop: 'optionalValue',
        label: 'Options'
      },
      {
        prop: 'defaultValue',
        label: 'Default'
      }
    ]

    eventsColumn = [
      {
        prop: 'name',
        label: 'Name'
      },
      {
        prop: 'desc',
        label: 'Description'
      },
      {
        prop: 'args',
        label: 'Callback args'
      }
    ]

    compile(code) {
      return Vue.compile(code).render
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    .code {
      display: block;
      background: #000;
      color: #fff;
      padding: 15px;
      font-size: 16px;
      overflow: auto;
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
