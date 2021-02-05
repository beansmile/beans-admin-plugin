import Vue from 'vue'
import _ from 'lodash'

export class SimpleStore {
  isFetching = false
  isRejected = false
  isFulfilled = false

  static create(state) {
    const instance = new this();
    if (state) {
      _.forEach(Object.getOwnPropertyDescriptors(state), (descriptor, key) => {
        if ('value' in descriptor) {
          instance[key] = descriptor.value;
        } else {
          Object.defineProperty(instance, key, descriptor);
        }
      });
    }
    Vue.observable(instance);
    return instance;
  }

  fetchData() {
    return Promise.resolve();
  }

  tryFetchData() {
    return !this.isFulfilled && this.fetchData(...arguments);
  }

  mergeFetched(handle) {
    return this.fetching(handle, true);
  }

  async fetching(handle, autoMerge = false) {
    this.isFetching = true;

    try {
      const res = await (typeof handle === 'function' ? handle() : handle);
      const newState = autoMerge ? (res.isResponse ? res.data : res) : void 0;
      Object.assign(this, {
        isFetching: false,
        isRejected: false,
        isFulfilled: true,
      }, newState);
      return res;
    } catch (err) {
      Object.assign(this, {
        isFetching: false,
        isRejected: true,
      });
      throw err;
    }
  }
}
