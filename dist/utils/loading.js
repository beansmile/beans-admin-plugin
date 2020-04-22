import _Loading from "element-ui/lib/loading";
import "regenerator-runtime/runtime";
import _asyncToGenerator from "@babel/runtime-corejs2/helpers/esm/asyncToGenerator";
export default function autoLoading(_x) {
  return _autoLoading.apply(this, arguments);
}

function _autoLoading() {
  _autoLoading = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(promise) {
    var loadingInstance;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(promise instanceof Promise)) {
              _context.next = 3;
              break;
            }

            loadingInstance = _Loading.service({
              fullscreen: true,
              lock: true
            });
            return _context.abrupt("return", promise.finally(function () {
              return loadingInstance.close();
            }));

          case 3:
            return _context.abrupt("return", promise);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _autoLoading.apply(this, arguments);
}