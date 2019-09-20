import _ from 'lodash'
import fly from './fly';

const request = {}

_.forEach(['get', 'post', 'put', 'patch', 'delete', 'all'], method => {
  request[method] = function (url, data, config) {
    if (_.has(data, 'params')) data = data.params
    return fly[method](url, data, config)
  }
})

export default request
