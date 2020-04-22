import "regenerator-runtime/runtime";
import "core-js/modules/es6.function.name";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
import fly from "./fly";
export function download() {
  return _download.apply(this, arguments);
}

function _download() {
  _download = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var _ref,
        url,
        params,
        _ref$name,
        name,
        result,
        a,
        blob,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, url = _ref.url, params = _ref.params, _ref$name = _ref.name, name = _ref$name === void 0 ? 'resource.xlsx' : _ref$name;
            _context.next = 3;
            return fly.get(url, params, {
              responseType: 'blob'
            });

          case 3:
            result = _context.sent;
            a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            blob = new Blob([result]);
            a.href = window.URL.createObjectURL(blob);
            a.download = name;
            a.click();
            document.body.removeChild(a);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _download.apply(this, arguments);
}

export function downloadFromUrl(_x) {
  return _downloadFromUrl.apply(this, arguments);
}

function _downloadFromUrl() {
  _downloadFromUrl = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(_ref2) {
    var url, _ref2$name, name, link;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = _ref2.url, _ref2$name = _ref2.name, name = _ref2$name === void 0 ? 'resource' : _ref2$name;
            link = document.createElement('a');
            link.href = url;
            link.download = name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _downloadFromUrl.apply(this, arguments);
}