import Vue from 'vue';
import Plugin from '../../plugin';

const config = {
  componentPrefix: 'admin', // Plugin 全局组件前缀
  globalConfigKey: 'adminConfig', // 挂在Vue对象下的全局配置的key
  ckeditor: {
    editorConfig: new Function, // https://github.com/beansmile/beans-admin-plugin/blob/v3.1/src/plugin/components/ck-editor/index.vue#L27
    contentsCss: [], // https://github.com/beansmile/beans-admin-plugin/blob/v3.1/src/plugin/components/ck-editor/index.vue#L36
  },
  upload: {
    // {
    //   "id": 1,
    //   "key": "",
    //   "filename": "",
    //   "content_type": "",
    //   "metadata": {},
    //   "byte_size": 0,
    //   "checksum": "",
    //   "created_at": "",
    //   "application_id": null,
    //   "directory_id": null,
    //   "tag_list": [],
    //   "signed_id": "",
    //   "attachable_sgid": "",
    //   "direct_upload": {
    //     "url": "",
    //     "blob_url": "",
    //     "headers": {
    //       "Content-Type": "",
    //       "Content-MD5": "",
    //       "x-token": ""
    //     }
    //   }
    // }
    directUploadURL: '/blobs/direct_upload', // 直接上传接口 POST
    /**
     * @description 自定义上传
     * @param {Object} file 文件对象
     * @param {Object} params2 第二个参数
     * @param {String} params.filename 文件名
     * @param {String} params.content_type 文件content_type
     * @param {Number} params.byte_size 文件size
     * @param {String} params.checksum checksum
     * @param {Array} params.tags 文件标签
     * @param {Array} params.dirPath 文件夹
     * @param {Array} params.* 从resourceUploader.formColumns 表单columns里面取到的值
     * @param {Object} params3 第二个参数
     * @param {Function} params3.onProgress 上传进度回调 onProgress(progress: Number)
     */
    customUpload: new Function,
    resourceBlobURL: '', // 获取资源文件接口 GET
    resourceBlobTagURL: '', // 获取资源文件的标签接口 GET
    /**
     * @description 获取资源文件自定义函数
     * @param {Object} params
     * @param {Number} params.per_page
     * @param {Number} params.page
     * @param {Any} params.* // 从resourceUploader.filterColumns取到的参数
    */
    onFetchResourceBlob: new Function,
    resourceUploader: {
      formColumns: [], // 上传组件顶部form columns （值会传给upload）
      filterColumns: [] // 资源列表顶部筛选columns
    }
  },
  // 文件夹组件配置
  attachDir: {
    // 权限配置
    ability: {
      read: true,
      create: true,
      destroy: true,
      update: true
    },
    apiPath: '' // api路径
  },
  cropper: {}, // 图片裁剪组件配置 https://github.com/fengyuanchen/cropperjs#options
  request: {
    baseURL: '/admin_api/v1', // api 请求baseURL
    timeout: 30000, // 超时时间
    // https://wendux.github.io/dist/#/doc/flyio/config
    /**
     * @description onResponse
     * @param {Object} response
     */
    onResponse: new Function,
    /**
     * @description onError
     * @param {Object} error
     */
     onError: new Function,
  },
  i18n: {
    localeStorageKey: 'locale', // i18n 本地存储key
    locales: { // i18n 可选语言
      zh_cn: '简体中文',
      en: 'English'
    }
  },
  collapse: {
    showController: true, // 是否显示折叠控制器
    initValue: true // 初始化折叠状态
  },
  sourcePage: {
    sortable: [], // 默认排序prop
    columns: [], // Array || Function，同sourcePage。 sourcePage全局columns，所有页面会应用这个配置，页面column有相同prop优先级更高
    formColumns: [], // Array || Function，同sourcePage。sourcePage全局formColumns，所有页面会应用这个配置，页面column有相同prop优先级更高
    filterColumns: [], // Array || Function，同sourcePage。sourcePage全局filterColumns，所有页面会应用这个配置，页面column有相同prop优先级更高
  },
  pageGenerator: {
    enableModuleName: false // 页面编辑器是否显示模块名(一般是埋点用)
  },
  // 响应式断点(px)
  screen: {
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1920
  }
};

Vue.use(Plugin, config);
