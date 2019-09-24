import moment from 'moment'

export function randomString() {
  return Math.random().toString(36).substr(2, 9)
}

export function randomFileName(fileName) {
  const splitArr = fileName.split('.');
  const ext = splitArr.length > 1 ? splitArr.pop() : '';
  return `${moment().format('YYMMDD')}/${randomString()}${ext ? '.' + ext : ''}`
}
