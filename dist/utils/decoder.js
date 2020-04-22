import "core-js/modules/es6.regexp.replace";
import "core-js/modules/es6.regexp.to-string";
export default function decoder(text) {
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
}