<script>import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";

var _dec, _class, _class2, _descriptor, _temp;

import { Vue, Component, Prop } from 'vue-property-decorator';
var VNode = (_dec = Prop(Function), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(VNode, _Vue);

  function VNode() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, VNode);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(VNode)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "renderNode", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(VNode, [{
    key: "render",
    value: function render() {
      return this.renderNode && this.renderNode(this.$createElement);
    }
  }]);

  return VNode;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "renderNode", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { VNode as default };</script>
