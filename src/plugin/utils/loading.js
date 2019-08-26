import { Loading } from 'element-ui';

export default async function autoLoading(promise) {
  if (promise instanceof Promise) {
    let loadingInstance = Loading.service({ fullscreen: true, lock: true });
    return promise.finally(() => loadingInstance.close());
  }
  return promise;
}
