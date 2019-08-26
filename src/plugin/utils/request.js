import axios from 'axios';
import _ from 'lodash';
import { MessageBox, Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { loadingService } from '../services';
import Vue from 'vue';

export const request = axios;

export default request;

const useNprogress = requestConfig => requestConfig.loading === true || ['get', 'delete'].includes(requestConfig.method) && requestConfig.loading !== false;

const showNprogress = requestConfig => {
  if (useNprogress(requestConfig)) {
    loadingService.add();
    loadingService.state.count && NProgress.start();
  }
}

const hideNprogress = requestConfig => {
  if (useNprogress(requestConfig)) {
    loadingService.miuns();
    !loadingService.state.count && NProgress.done();
  }
}

const handleTransformRequest = requestConfig => {
  const $config = _.merge({}, Vue.appConfig.request, requestConfig);

  if (!($config.params instanceof FormData)) {
    const params = {};
    _.forEach($config.params, (val, key) => {
      if (!key.startsWith('_')) {
        params[key] = val;
      }
    });
    $config.params = params;
  }
  return $config;
}

const handleResponseSuccess = response => {
  const { data, headers } = response;
  let res = data;
  if (headers['x-total']) {
    const pagination = {
      total: +headers['x-total'],
      'current-page': +headers['x-page'],
      'page-size': +headers['x-per-page'],
    }
    res = {
      data,
      pagination
    }
  }
  return res;
}

const handleResponseError = error => {
  const app = Vue.appRouter.app;
  const status = _.get(error, 'response.status');
  switch (status) {
    case 401: {
      if (app.$route.name !== 'login') {
        app.$router.replace({ name: 'login' });
        Message.info('请登录');
      }
      break;
    }
    case 403:
      app.$router.replace({ name: '403' });
      break;
    default: {
      const errorMessage = _.get(error, 'response.data.error') || _.get(error, 'response.data.message') || error.message;
      MessageBox.alert(errorMessage, { title: '错误' });
      return Promise.reject(error);
    }
  }
}

request.interceptors.request.use(config => {
  showNprogress(config);
  return handleTransformRequest(config);
});

request.interceptors.response.use(response => {
  hideNprogress(response.config);
  return handleResponseSuccess(response);
}, error => {
  hideNprogress(error.config);
  return handleResponseError(error);
});
