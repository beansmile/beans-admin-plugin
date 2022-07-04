import _ from 'lodash';

function handleChange(changeEvent) {
  return function(val) {
    const valTrimed = _.trim(val);
    if (_.isArray(changeEvent)) {
      changeEvent.forEach(function(eventFn) {
        handleChange(eventFn)(val);
      });
      return;
    }
    if (_.isFunction(changeEvent)) {
      changeEvent.call(this, valTrimed);
    }
  }
}

export default {
  functional: true,
  render(h, context) {
    const data = {
      ...context.data,
      on: {
        ..._.omit(context.data.on, 'change'),
        change: handleChange(_.get(context, 'data.on.change'))
      }
    };
    return h('el-input', data, context.children);
  }
}
