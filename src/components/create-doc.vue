<template>
  <div class="page">
    <h2 class="title">{{ title }}</h2>
    <slot />

    <div v-for="item in renderAttributes" :key="item.title">
      <h3>{{ item.title }}</h3>
      <c-source-table
        :table="{ data: item.attributes }"
        :columns="attributesColumn"
      />
    </div>

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
    @Prop(Boolean) multipleAttributes;

    attributesColumn = [
      {
        prop: 'prop',
        label: '参数'
      },
      {
        prop: 'desc',
        label: '说明',
        renderCell: (h, { row }) => {
          if (_.isFunction(row.desc)) {
            return row.desc(h, { row });
          }
          return row.desc;
        }
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

    get renderAttributes() {
      if (_.get(this.attributes[0], 'attributes')) {
        return this.attributes
      }
      return [
        {
          title: 'Props',
          attributes: this.attributes
        }
      ]
    }

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
