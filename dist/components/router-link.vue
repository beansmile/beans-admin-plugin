<script>import "core-js/modules/es6.regexp.replace";
import _initializerDefineProperty from "@babel/runtime-corejs2/helpers/esm/initializerDefineProperty";
import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs2/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";
import _applyDecoratedDescriptor from "@babel/runtime-corejs2/helpers/esm/applyDecoratedDescriptor";
import _initializerWarningHelper from "@babel/runtime-corejs2/helpers/esm/initializerWarningHelper";
import _get from "lodash/get";

var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

import { Vue, Component, Prop } from 'vue-property-decorator';
import { permissionService } from "../services";
var CRouterLink = (_dec = Prop([Object, String]), _dec2 = Prop(Boolean), _dec3 = Prop({
  type: Boolean,
  default: true
}), Component(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(CRouterLink, _Vue);

  function CRouterLink() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, CRouterLink);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CRouterLink)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _initializerDefineProperty(_this, "to", _descriptor, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "replace", _descriptor2, _assertThisInitialized(_this));

    _initializerDefineProperty(_this, "keepNode", _descriptor3, _assertThisInitialized(_this));

    return _this;
  }

  _createClass(CRouterLink, [{
    key: "showPermissionTip",
    value: function showPermissionTip() {
      this.$message({
        message: this.$t('您没有权限'),
        type: 'warning'
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var h = arguments[0];

      if (this.show) {
        return h("router-link", {
          "attrs": {
            "to": this.to,
            "replace": this.replace
          }
        }, [this.$slots.default]);
      } else {
        if (this.keepNode) {
          return h("div", {
            "class": "link-no-permission-wrap",
            "on": {
              "click": function click() {
                return _this2.showPermissionTip();
              }
            }
          }, [this.$slots.default]);
        }

        return null;
      }
    }
  }, {
    key: "show",
    get: function get() {
      var router = Vue.appRouter;

      if (this.to) {
        var _router$resolve = router.resolve(this.to),
            route = _router$resolve.route;

        return permissionService.hasPermission(_get(route, 'meta.permission'));
      }

      return false;
    }
  }]);

  return CRouterLink;
}(Vue), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "to", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "replace", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "keepNode", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
export { CRouterLink as default };</script>
