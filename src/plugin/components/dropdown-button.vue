<template>
  <div class="button-list" v-if="buttonMode">
    <el-button v-bind="getButtonPropsMerged(button)" v-for="(button, index) in buttons" :key="index" @click="handleCommand(index)">{{ button.text || button.title }}</el-button>
  </div>
  <div class="dropdown-button" v-else>
    <el-dropdown @command="handleCommand" v-if="buttons.length > 1">
      <el-button v-bind="buttonProps">{{ buttonText }}<i class="el-icon-arrow-down el-icon--right" /></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(button, index) in buttons"
          :key="index"
          :command="index"
        >
          {{ button.text || button.title }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-button v-else v-bind="getButtonPropsMerged(button)" v-for="(button, index) in buttons" :key="index" @click="handleCommand(index)">{{ button.text || button.title }}<i class="el-icon-arrow-right el-icon--right" /></el-button>
  </div>
</template>

<script>
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class DropdownButton extends Vue {
  @Prop({ type: Array, default: () => [] }) buttons;
  @Prop({ type: Object, default: () => ({ type: 'text' }) }) buttonProps;
  @Prop({ type: String, default: '操作' }) buttonText;
  @Prop(Boolean) buttonMode;

  getButtonPropsMerged(button) {
    return Object.assign({}, this.buttonProps, button.props);
  }

  handleCommand(index) {
    const button = this.buttons[index];
    button.handler && button.handler(this.$createElement);
  }
}
</script>
