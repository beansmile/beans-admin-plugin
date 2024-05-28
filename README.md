## env watermark 水印
非正式环境显示提示，防止客户将 staging 环境，误认为是正式环境。
通过以下环境变量控制

VUE_APP_ENV: 不为 production 时，会有水印提示

VUE_APP_CLOSE_ENV_WATERMARK: 可在开发环境控制，关闭提示

VUE_APP_ENV_WATERMARK_TEXT: 自定义提示文案，默认 `This is the ${VUE_APP_ENV} environment`
