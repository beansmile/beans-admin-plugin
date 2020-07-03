<template>
  <el-form
    :model="form"
    label-position='left'
    label-width='auto'
    v-bind="$attrs"
    class="c-source-form-v2"
    ref="source-form-v2"
  >
    <slot name="form-header"></slot>
    <div class="form-content">
      <slot name="content-header"></slot>

      <div class="form-group" v-for="formGroup in formColumnGroups" :key="formGroup.title">
        <h3 class="form-group-title" v-if="formGroup.title">{{ formGroup.title }}</h3>
        <div class="form-group-content">
          <el-form-item
            v-bind="formItem.itemProps"
            v-for="formItem in formGroup.columns"
            :key="formItem.prop"
          >
            <v-node :render-node="() => renderVNode(formItem.itemSlots.header, formItem.prop)" v-if="formItem.itemSlots.header" />
            <component
              :is="formItem.component"
              v-bind="formItem.props"
              :value="getFormItemValue(formItem.prop)"
              @input="setFormItemValue(formItem.prop, $event)"
              @change="setFormItemValue(formItem.prop, $event)"
              v-on="formItem.events"
            >
              <template v-for="(slotValue, slotName) in formItem.slots" v-slot:[slotName]>
                <v-node :key="slotName" :render-node="() => renderVNode(slotValue, formItem.prop)" />
              </template>
            </component>
            <div class="form-item-hint" v-if="formItem.props.hint">
              <v-node :render-node="() => renderVNode(formItem.props.hint, formItem.prop)" />
            </div>
            <v-node :render-node="() => renderVNode(formItem.itemSlots.footer, formItem.prop)" v-if="formItem.itemSlots.footer" />
          </el-form-item>
        </div>
      </div>
      <slot name="content-footer"></slot>
    </div>
    <slot name="action">
      <div class="form-action">
        <el-button type="primary" @click="handleSubmit">{{ $t('确定') }}</el-button>
      </div>
    </slot>
  </el-form>
</template>

<script>
  import { Vue, Component, Model, Prop } from 'vue-property-decorator';
  import _ from 'lodash';

  @Component
  export default class SourceFormV2 extends Vue {
    @Model('change', { type: Object }) form;
    @Prop(Array) columns;

    get formColumnGroups() {
      const isGroupMode = !!_.get(this.columns, '0.columns');
      if (isGroupMode) {
        return this.columns.map(columnGroup => ({
          ...columnGroup,
          columns: columnGroup.columns.map(this.transformFormColumn)
        }));
      }
      return [
        {
          title: '',
          columns: this.columns.map(this.transformFormColumn)
        }
      ]
    }

    transformFormColumn(column) {
      const formItem = {
        itemSlots: {},
        itemProps: {},
        slots: {},
        events: {},
        props: {},
        ...column
      }
      if (!_.get(formItem, 'itemProps.rules.length') && formItem.required) {
        _.set(formItem, 'itemProps.rules', {
          required: true,
          message: `${formItem.label}必填`,
          trigger: 'blur'
        });
      }
      Object.assign(formItem.itemProps, {
        label: column.label,
        prop: column.prop
      });
      return formItem;
    }

    getPureForm() {
      return JSON.parse(JSON.stringify(this.form));
    }

    getFormItemValue(prop) {
      return _.get(this.form, prop);
    }

    setFormItemValue(prop, value) {
      if (this.getFormItemValue(prop) !== value) {
        const form = this.getPureForm();
        this.$emit('change', _.set(form, prop, value));
      }
    }

    renderVNode(node, prop) {
      if (_.isFunction(node)) {
        return node(this.$createElement, {
          form: this.getPureForm(),
          value: this.getFormItemValue(prop)
        });
      }
      if (_.isObject(node)) {
        // TODO 这块的渲染饶了一圈
        return new Vue(node).$mount()._vnode;
      }
      return <span>{node}</span>;
    }

    async handleSubmit() {
      await this.$refs['source-form-v2'].validate();
      this.$emit('submit', this.getPureForm());
    }
  }
</script>
