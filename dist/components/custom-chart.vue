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

import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/legendScroll';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import { Vue, Component, Prop } from 'vue-property-decorator';
var defaultOptions = {
  tooltip: {
    trigger: 'axis'
  },
  color: ['#eca117', '#5d93e4', '#4fc08d', '#827973', '#dc7272', '#d784dc', '#dadc45', '#9d93d2', '#513d82']
};
var Chart = (_dec = Prop(Object), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(Chart, _Vue);

  function Chart() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Chart);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Chart)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "options", _descriptor, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(Chart, [{
    key: "render",
    value: function render() {
      var h = arguments[0];
      var options = Object.assign({}, defaultOptions, this.options);
      return h(ECharts, {
        "attrs": {
          "options": options
        }
      });
    }
  }]);

  return Chart;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "options", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Chart as default };</script>
