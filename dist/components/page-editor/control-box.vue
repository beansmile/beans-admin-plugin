<template>
  <portal to="page-editor">
    <el-drawer
      :visible="visible"
      @close="$emit('close')"
      :title="title"
    >
      <div class="c-control-box">
        <slot />
      </div>
    </el-drawer>
  </portal>
</template>

<script>import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";

var _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _temp;

import { Vue, Component, Prop } from 'vue-property-decorator';
var controlBox = (_dec = Prop(Boolean), _dec2 = Prop(String), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(controlBox, _Vue);

  function controlBox() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, controlBox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(controlBox)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "visible", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "title", _descriptor2, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(controlBox, [{
    key: "created",
    value: function created() {
      var component = this.$mount();
      document.querySelector('body').appendChild(component.$el);
    }
  }]);

  return controlBox;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "visible", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "title", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { controlBox as default };</script>
