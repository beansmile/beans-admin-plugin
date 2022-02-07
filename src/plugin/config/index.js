export default {
  componentPrefix: 'admin',
  globalConfigKey: 'adminConfig',
  ckeditor: {
    editorConfig: new Function,
    contentsCss: [],
  },
  upload: {
    directUploadURL: '/blobs/direct_upload',
    resourceBlobURL: '',
    resourceBlobTagURL: '',
    resourceUploader: {
      formColumns: [],
      filterColumns: []
    }
  },
  attachDir: {},
  cropper: {},
  request: {
    baseURL: '/admin_api/v1',
    timeout: 30000
  },
  i18n: {
    localeStorageKey: 'locale',
    locales: {
      zh_cn: '简体中文',
      en: 'English'
    }
  },
  collapse: {
    showController: true,
    initValue: true
  },
  sourcePage: {
    trimFilter: false, // 筛选时去掉字符串前后空格
  },
  pageGenerator: {
    enableModuleName: false
  }
};
