import { request } from './request';

export async function download({
  url,
  params,
  name = 'resource.xlsx'
} = {}) {
  const result = await request.get(url, { params, responseType: 'blob' });
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  const blob = new Blob([result]);
  a.href = window.URL.createObjectURL(blob);
  a.download = name;
  a.click();
  document.body.removeChild(a);
}

export async function downloadFromUrl({
  url,
  name = 'resource'
}) {
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
