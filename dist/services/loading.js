import _classCallCheck from "@babel/runtime-corejs2/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs2/helpers/esm/createClass";
import Vue from 'vue';

var LoadingService =
/*#__PURE__*/
function () {
  function LoadingService() {
    _classCallCheck(this, LoadingService);

    this.state = Vue.observable({
      count: 0
    });
  }

  _createClass(LoadingService, [{
    key: "add",
    value: function add() {
      this.state.count++;
    }
  }, {
    key: "miuns",
    value: function miuns() {
      this.state.count--;
    }
  }]);

  return LoadingService;
}();

export var loadingService = new LoadingService();