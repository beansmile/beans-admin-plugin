import "core-js/modules/es6.regexp.replace";
import "core-js/modules/es6.regexp.to-string";
import qs from 'qs';
export var decodeQuery = function decodeQuery(query) {
  var decoder = function decoder(text) {
    if (/^(\d+|\d*\.\d+)$/.test(text)) {
      var num = parseFloat(text);
      return num.toString() === text ? num : text;
    }

    var keywords = {
      true: true,
      false: false,
      null: null,
      undefined: undefined
    };
    if (text in keywords) return keywords[text];

    try {
      return decodeURIComponent(text.replace(/\+/g, ' '));
    } catch (err) {
      return text;
    }
  };

  return qs.parse(query, {
    decoder: decoder
  });
};
export var encodeQuery = function encodeQuery(query) {
  var result = qs.stringify(query);
  return result ? '?' + result : '';
};