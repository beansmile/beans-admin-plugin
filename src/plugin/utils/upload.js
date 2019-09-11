import Vue from 'vue';
import _ from 'lodash';
import { request } from './request';

export default async function upload(file) {
  const { meta_url, customUpload } = Vue.appConfig.upload;
  if (_.isFunction(customUpload)) {
    return customUpload(file);
  }
  const qiniuMeta = await request.get(meta_url, { loading: false });
  const { bucket_domain, token, upload_url = Vue.appConfig.upload.upload_url } = qiniuMeta;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('token', token);
  const { key } = await request.post(upload_url, formData, { baseURL: '', withCredentials: false, loading: false });
  return `http://${bucket_domain}/${key}`;
}
