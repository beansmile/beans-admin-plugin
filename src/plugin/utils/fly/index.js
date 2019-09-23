import Fly from 'flyio/dist/npm/fly'
import { onSend, onSucceed, onError } from './helper'

const fly = new Fly

fly.config.return_res = false

fly.interceptors.request.use(onSend)

fly.interceptors.response.use(onSucceed, onError)

export default fly
