import _ from 'lodash';

const IGNORE_KEY =  'sentry_ignore';

const ignoreErrors = [
  new RegExp(IGNORE_KEY, 'i'),
  /cancel/i
];

export function createSentryIgnoreError(target) {
  const targetObj = _.isObject(target) ? target : new Error(target);
  targetObj[IGNORE_KEY] = true;
  return targetObj;
}

export function initSentry(config = {}) {
  if (config.dsn && config.environment !== 'development') {
    const Sentry = require('@sentry/browser');
    const configIgnoreErrors = config.ignoreErrors || [];
    Sentry.init({
      ...config,
      ignoreErrors: _.uniq(configIgnoreErrors.concat(ignoreErrors)),
      beforeSend(event, hint) {
        if (_.isFunction(config.beforeSend)) {
          return config.beforeSend(event, hint, IGNORE_KEY);
        }
        const originalException = _.get(hint, 'originalException') || {};
        if (originalException[IGNORE_KEY]) {
          return null;
        }
        return event;
      }
    });
  }
}
