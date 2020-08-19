import Fly from 'flyio/dist/npm/fly';
import { onSend, onSucceed, onError } from "./helper";
var fly = new Fly();
fly.config.return_res = false;
fly.config.headers['Accept'] = 'application/json, text/plain, */*';
fly.interceptors.request.use(onSend);
fly.interceptors.response.use(onSucceed, onError);
export default fly;