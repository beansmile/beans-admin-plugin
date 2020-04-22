import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh_cn from './zh_cn'
import en from './en'

Vue.use(VueI18n)

// i18n 库和 element 结合使用文档 https://element.eleme.cn/#/zh-CN/component/i18n
export const i18n = new VueI18n({
  locale: 'zh_cn', // 设置地区
  messages: { zh_cn, en }, // 设置地区信息
})

export { zh_cn, en }
