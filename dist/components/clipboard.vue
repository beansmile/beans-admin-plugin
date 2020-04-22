<script>import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";
import _throttle from "lodash/throttle";

var _dec, _class, _class2, _descriptor, _temp;

import { Vue, Component, Prop } from 'vue-property-decorator';
import ClipboardJS from 'clipboard';
import { sleep } from "../utils";
var hideAfter = 1500;
var Clipboard = (_dec = Prop(String), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(Clipboard, _Vue);

  function Clipboard() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Clipboard);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Clipboard)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "text", _descriptor, _assertThisInitialized(_this));

    _this.showTip = false;
    _this.debouncedShowTip = _throttle(function () {
      return _this.handleShowTip();
    }, hideAfter + 1000, {
      trailing: false
    });
    return _this;
  }

  _createClass(Clipboard, [{
    key: "mounted",
    value: function mounted() {
      var _this2 = this;

      new ClipboardJS(this.$refs.trigger, {
        text: function text() {
          return _this2.text || _this2.$refs.container.textContent.trim() || '';
        }
      }).on('success', this.debouncedShowTip);
    }
  }, {
    key: "handleShowTip",
    value: function () {
      var _handleShowTip = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.showTip = true;
                _context.next = 3;
                return sleep(hideAfter);

              case 3:
                this.showTip = false;

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function handleShowTip() {
        return _handleShowTip.apply(this, arguments);
      }

      return handleShowTip;
    }()
  }, {
    key: "render",
    value: function render() {
      var h = arguments[0];
      return h("div", {
        "class": "c-clipboard",
        "ref": "container"
      }, [this.$slots.default, h("el-tooltip", {
        "attrs": {
          "content": this.$t('内容已复制'),
          "value": this.showTip,
          "hide-after": hideAfter,
          "manual": true
        }
      }, [h("i", {
        "ref": "trigger",
        "class": "el-icon-document-copy icon-copy"
      })])]);
    }
  }]);

  return Clipboard;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "text", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { Clipboard as default };</script>
