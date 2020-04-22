<template>
  <div class="page">
    <img @click="goBack" class="error-page-image" :src="IMG404" alt="404-image" />
  </div>
</template>

<script>import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs2/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime-corejs2/helpers/esm/inherits";

var _class, _temp;

import { Vue, Component } from 'vue-property-decorator';

var Page404 = Component(_class = (_temp =
/*#__PURE__*/
function (_Vue) {
  _inherits(Page404, _Vue);

  function Page404() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Page404);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Page404)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.IMG404 = require("./image").default;
    return _this;
  }

  _createClass(Page404, [{
    key: "goBack",
    value: function goBack() {
      this.$router.go(-1);
    }
  }]);

  return Page404;
}(Vue), _temp)) || _class;

export { Page404 as default };</script>
