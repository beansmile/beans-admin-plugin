import moment from 'moment'

export function randomString() {
  return Math.random().toString(36).substr(2, 9)
}

export function randomFileName(fileName) {
  return `${moment().format('YYMMDD')}/${randomString()}/${fileName}`
}
