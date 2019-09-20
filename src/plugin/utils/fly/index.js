import fly from 'flyio'
import { onSend, onSucceed, onError } from './helper'

fly.interceptors.request.use(onSend)

fly.interceptors.response.use(onSucceed, onError)

export default fly
