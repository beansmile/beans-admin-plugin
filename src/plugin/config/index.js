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
    resourceBlobTagURL: ''
  },
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
  sourcePage: {}
};
