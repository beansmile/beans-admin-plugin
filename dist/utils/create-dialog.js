import "core-js/modules/es7.object.get-own-property-descriptors";
import "core-js/modules/web.dom.iterable";
import "core-js/modules/es6.object.keys";
import _defineProperty from "@babel/runtime-corejs2/helpers/esm/defineProperty";
import _Dialog from "element-ui/lib/dialog";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import Vue from 'vue';
import { i18n } from "../i18n";
export default function createDialog() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$props = _ref.props,
      props = _ref$props === void 0 ? {} : _ref$props,
      _ref$slots = _ref.slots,
      slots = _ref$slots === void 0 ? {} : _ref$slots,
      _ref$events = _ref.events,
      events = _ref$events === void 0 ? {} : _ref$events;

  var DialogConstructor = Vue.extend(_Dialog);
  var instance = new DialogConstructor({
    i18n: i18n,
    propsData: _objectSpread({}, props)
  });
  instance.$mount();
  instance.$slots.default = slots.default;
  instance.$slots.title = slots.title;
  instance.$slots.footer = slots.footer;
  var open = events.open,
      opened = events.opened,
      close = events.close,
      closed = events.closed;
  instance.$on('open', function () {
    open && open(instance);
  });
  instance.$on('opened', function () {
    opened && opened(instance);
  });
  instance.$on('close', function () {
    close && close(instance);
  });
  instance.$on('closed', function () {
    closed && closed();
    document.body.removeChild(instance.$el);
  });
  document.body.appendChild(instance.$el);
  instance.visible = true;
  return instance;
}