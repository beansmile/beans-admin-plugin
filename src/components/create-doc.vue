<template>
  <div class="page-doc">
    <h2 class="title">{{ title }}</h2>
    <slot />

    <div v-for="item in renderAttributes" :key="item.title">
      <template v-if="item.attributes && item.attributes.length">
        <h3>{{ item.title }}</h3>
        <bean-table
          :value="item.attributes"
          :columns="attributesColumn"
          :height="null"
        />
        <bean-table
          v-if="item.events && item.events.length"
          :value="item.events"
          :columns="eventsColumn"
          :height="null"
        />
      </template>
    </div>

    <template v-if="events && events.length">
      <h3>Events</h3>
      <bean-table
        :value="events"
        :columns="eventsColumn"
        :height="null"
      />
    </template>
    <template v-if="examples && examples.length">
      <div class="example" v-for="(item, index) in examples" :key="index">
        <h3>{{ item.title }}</h3>
        <div class="example-exec" v-if="item.example">
          <component :is="item.example" />
        </div>
        <highlightjs autodetect :code="item.code" />
      </div>
    </template>
  </div>
</template>


<script>
  import { Vue, Component, Prop } from 'vue-property-decorator';
  import _ from 'lodash';
  @Component
  export default class CreateDoc extends Vue {
    @Prop(String) title;
    @Prop({ type: Array, default: () => [] }) attributes;
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
  }
</script>

<style lang="scss" scoped>
  .page-doc {
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
    padding: 15px;

    /deep/ code {
      font-family: 'Courier New', Courier, monospace;
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
