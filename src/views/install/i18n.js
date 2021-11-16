import Vue from 'vue';
import VueI18n from 'vue-i18n';
import { locale } from 'beans-admin-plugin';
import _ from 'lodash';
import Element from 'element-ui';
import elementEnLocale from 'element-ui/lib/locale/lang/en';
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN';

Vue.use(VueI18n);

const messages = {
  zh_cn: {
    home: '首页'
  },
  en: {
    home: 'Home'
  }
}

export const i18n = new VueI18n({
  locale: 'zh_cn',
  fallbackLocale: 'zh_cn',
  messages: _.merge({}, {
    zh_cn: locale['zh-CN'],
    en: locale.en
  }, {
    zh_cn: elementZhLocale,
    en: elementEnLocale,
  }, messages)
});

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
});
