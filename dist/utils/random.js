import "core-js/modules/es6.regexp.split";
import "core-js/modules/es6.regexp.to-string";
import moment from 'moment';
export function randomString() {
  return Math.random().toString(36).substr(2, 9);
}
export function randomFileName(fileName) {
  var splitArr = fileName.split('.');
  var ext = splitArr.length > 1 ? splitArr.pop() : '';
  return "".concat(moment().format('YYMMDD'), "/").concat(randomString()).concat(ext ? '.' + ext : '');
}