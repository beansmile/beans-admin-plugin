<template>
  <create-doc
    title="插件配置"
    :attributes="attributes"
    :examples="examples"
  />
</template>

<script>
  import { Vue, Component } from 'vue-property-decorator';

  @Component
  export default class Doc extends Vue {
    attributes = [
      {
        title: 'Props',
        attributes: [
          {
            prop: 'router',
            desc: 'Vue router',
            type: 'Object',
            optionalValue: '/',
            defaultValue: '/'
          },
          {
            prop: 'name',
            desc: '网站名称',
            type: 'String',
            optionalValue: '',
            defaultValue: '后台管理'
          },
          {
            prop: 'logo',
            desc: '网站logo',
            type: 'String',
            optionalValue: '',
            defaultValue: ''
          },
          {
            prop: 'request',
            desc: '表格配置(见下面request配置)',
            type: 'Object',
            optionalValue: '',
            defaultValue: ''
          },
          {
            prop: 'upload',
            desc: '上传配置(见下面upload配置)',
            type: 'Object',
            optionalValue: '',
            defaultValue: ''
          },
          {
            prop: 'permission',
            desc: 'permission配置(见下面permission配置)',
            type: 'Object',
            optionalValue: '',
            defaultValue: ''
          },
          {
            prop: 'login',
            desc: '登录页配置(见下面login配置)',
            type: 'Object',
            optionalValue: '',
            defaultValue: ''
          },
          {
            prop: 'logout',
            desc: '退出登录配置(见下面logout配置)',
            type: 'Object',
            optionalValue: '',
            defaultValue: ''
          }
        ]
      },
      {
        title: 'request配置',
        attributes: [
          {
            prop: 'baseURL',
            desc: '请求baseurl',
            type: 'String',
            defaultValue: '/admin_api/v1'
          },
          {
            prop: 'timeout',
            desc: '超时时间(毫秒)',
            type: 'Number',
            defaultValue: '30000'
          },
          {
            prop: 'withCredentials',
            desc: '请求是否带cookie',
            type: 'Boolean',
            defaultValue: 'true'
          },
          {
            prop: 'beforeRequest',
            desc: '发请求前拦截',
            type: 'Function: request',
            defaultValue: '() => {}'
          }
        ]
      },
      {
        title: 'upload配置',
        attributes: [
          {
            prop: 'useHttps',
            desc: '上传成功后返回的是https链接',
            type: 'Boolean',
            defaultValue: 'true'
          },
          {
            prop: 'meta_url',
            desc: '获取上传meta信息',
            type: 'String',
            defaultValue: '/qiniu_meta'
          },
          {
            prop: 'upload_url',
            desc: '上传地址',
            type: 'String',
            defaultValue: 'https://upload-z2.qiniup.com'
          },
          {
            prop: 'customUpload',
            desc: '自定义上传',
            type: 'Function: (file, include_res, options)',
            defaultValue: '/'
          },
        ]
      },
      {
        title: 'permission配置',
        attributes: [
          {
            prop: 'request_url',
            desc: '请求url',
            type: 'String',
            defaultValue: ''
          },
          {
            prop: 'getPermissionMap',
            desc: '获取permissoinMap，getPermissionMap和request_url都不填则不检测权限',
            type: 'Function',
            defaultValue: ''
          },
        ]
      },
      {
        title: 'login配置',
        attributes: [
          {
            prop: 'token_storage_key',
            desc: '存token本地存储key',
            type: 'String',
            defaultValue: 'access_token'
          },
          {
            prop: 'token_header_key',
            desc: '请求时带token过去的header key',
            type: 'String',
            defaultValue: 'Authorization'
          },
          {
            prop: 'request_url',
            desc: '登录请求url',
            type: 'String',
            defaultValue: ''
          },
          {
            prop: 'navigateTo',
            desc: '登录完成跳转页面',
            type: 'Object,String',
            defaultValue: '{ name: "home" }'
          },
        ]
      },
      {
        title: 'logout配置',
        attributes: [
          {
            prop: 'request_url',
            desc: '请求url',
            type: 'String',
            defaultValue: ''
          }
        ]
      }
    ]

    examples = [
      {
        title: '用法',
        code: require('!raw-loader!./example.js').default,
      }
    ]
  }
</script>
