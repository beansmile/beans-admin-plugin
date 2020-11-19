import _ from 'lodash';

const numberToPxKey = [
  'width',
  'height',
  'fontSize',
  'lineHeight',
  'paddingRight',
  'paddingLeft',
  'paddingTop',
  'paddingBottom',
  'marginRight',
  'marginLeft',
  'marginTop',
  'marginBottom',
  'borderTopWidth',
  'borderRadius',
  'top',
  'left',
  'bottom',
  'right'
];

export default function(styleObj) {
  return _.mapValues(styleObj, (val, key) => {
    if (numberToPxKey.includes(key)) {
      // val 可能是undefined
      return (Number(val) || 0) + 'px';
    }
    return val;
  });
}
