import EngineWrapper from 'flyio/dist/npm/engine-wrapper'
import Fly from 'flyio/dist/npm/fly'
import NProgress from 'nprogress'
import { loadingService } from '../../services'
import { upload } from '../../utils'

const flyPure = new Fly

const engine = EngineWrapper(async (request, responseCallback) => {
  try {
    loadingService.add()
    loadingService.state.count && NProgress.start()

    if (/\/ckeditor\/qiniu_upload$/.test(request.url)) {
      const [url, result] = await upload(request.body.get('upload'), true)
      responseCallback({
        statusCode: result.engine.status,
        responseText: JSON.stringify({ fileName: result.data.key, uploaded: 1, url }),
        headers: result.headers,
        statusMessage: result.engine.statusText
      })
    } else {
      const res = await flyPure.request(request.url, request.data, request)
      responseCallback({
        statusCode: res.engine.status,
        responseText: res.engine.responseText,
        headers: res.headers,
        statusMessage: res.engine.statusText
      })
    }
  } catch (err) {
    responseCallback({
      statusCode: err.status,
      statusMessage: err.message
    })
  } finally {
    loadingService.miuns()
    !loadingService.state.count && NProgress.done()
  }
})

//覆盖默认
window.XMLHttpRequest = engine
