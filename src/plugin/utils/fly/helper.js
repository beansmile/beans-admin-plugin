import Vue from 'vue'
import _ from 'lodash'
import qs from 'qs'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { loadingService } from '../../services'
import decoder from '../decoder'

export async function onSend(request) {
  showNProgress(request);

  const appConfig = Vue.vadminConfig.request || {};
  if (_.isFunction(appConfig.onSend)) {
    await appConfig.onSend(request);
  }

  if (request.method === 'GET' && request.body) {
    const body = _.omitBy(request.body, (v, k) => k.startsWith('_'))
    request.params = qs.stringify(body, { arrayFormat: 'brackets' })
    delete request.body
  }
  return request
}

export function onSucceed(res) {
  hideNProgress(res.request)
  res['isResponse'] = true
  res.meta = {}
  _.forEach(res.headers, (v, k) => {
    v = res.headers[k] = [].concat(v)[0]
    if (/^x-/.test(k)) {
      const key = _.snakeCase(k.replace(/^x-/, ''))
      res.meta[key] = decoder(v)
    }
  })

  if ('total' in res.meta) {
    res.pagination = {
      total: res.meta['total'],
      'current-page': res.meta['page'],
      'page-size': res.meta['per_page'],
    }
  }

  if (res.request.return_res) {
    return res
  } else {
    return res.pagination ? { data: res.data, pagination: res.pagination } : res.data
  }
}

export function onError(err) {
  hideNProgress(err.request);
  const appConfig = Vue.vadminConfig.request || {};
  if (_.isFunction(appConfig.onError)) {
    appConfig.onError(err);
    return;
  }
  return err;
}

function useNProgress(request) {
  let loading = false
  if (['GET', 'DELETE'].includes(request.method) && request.loading !== false) {
    loading = true
  } else {
    loading = request.loading
  }
  return loading
}

function showNProgress(request) {
  if (useNProgress(request)) {
    loadingService.add()
    loadingService.state.count && NProgress.start()
  }
}

function hideNProgress(request) {
  if (useNProgress(request)) {
    loadingService.miuns()
    !loadingService.state.count && NProgress.done()
  }
}
