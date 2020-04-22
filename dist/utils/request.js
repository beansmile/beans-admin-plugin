import _has from "lodash/has";
import _forEach from "lodash/forEach";
import fly from "./fly";
var request = {};

_forEach(['get', 'post', 'put', 'patch', 'delete', 'all'], function (method) {
  request[method] = function (url, data, config) {
    if (_has(data, 'params')) data = data.params;
    return fly[method](url, data, config);
  };
});

export default request;