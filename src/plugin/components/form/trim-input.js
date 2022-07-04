import _ from 'lodash';

function handleInput(inputEvent) {
  return function(val) {
    const valTrimed = _.trim(val);
    if (_.isArray(inputEvent)) {
      inputEvent.forEach(function(eventFn) {
        handleInput(eventFn)(val);
      });
      return;
    }
    if (_.isFunction(inputEvent)) {
      inputEvent.call(this, valTrimed);
    }
  }
}

export default {
  functional: true,
  render(h, context) {
    const data = {
      ...context.data,
      on: {
        ..._.omit(context.data.on, 'input'),
        input: handleInput(_.get(context, 'data.on.input'))
      }
    };
    return h('el-input', data, context.children);
  }
}
