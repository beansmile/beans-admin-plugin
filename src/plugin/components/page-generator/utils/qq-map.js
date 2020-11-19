import jsonp from 'jsonp';
import qs from 'qs';

export const jsonpRequest = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    jsonp(`${url}?${qs.stringify(params)}`, {}, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

export const getQQMapPlaceSuggestions = async (keyword) => {
  if (!keyword) {
    return [];
  }
  const { data } = await jsonpRequest('https://apis.map.qq.com/ws/place/v1/suggestion', {
    keyword,
    region: '全国',
    output: 'jsonp',
    key: process.env.VUE_APP_QQ_MAP_KEY
  });
  return data.map(item => ({
    value: item.title,
    longitude: item.location.lng,
    latitude: item.location.lat
  }));
}
