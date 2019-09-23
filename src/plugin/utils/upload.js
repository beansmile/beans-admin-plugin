import Vue from 'vue';
import _ from 'lodash';
import fly from './fly';

export default async function upload(file, include_res = false) {
  const { meta_url, customUpload, useHttps } = Vue.appConfig.upload;
  if (_.isFunction(customUpload)) {
    return customUpload(file, include_res);
  }
  const qiniuMeta = await fly.get(meta_url, null, { loading: false });
  const { bucket_domain, token, upload_url = Vue.appConfig.upload.upload_url } = qiniuMeta;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('token', token);
  const res = await fly.post(upload_url, formData, {
    baseURL: '',
    withCredentials: false,
    loading: false,
    return_res: true,
  });
  const url = `${useHttps ? 'https' : 'http'}://${bucket_domain}/${res.data.key}`
  return include_res ? [url, res] : url;
}
