import { MessageBox, Alert } from 'element-ui';
import Vue from 'vue'
import Watermark from '../components/watermark.vue';

const VUE_APP_ENV = process.env.VUE_APP_ENV || 'development';
const closeEnvTips = Boolean(process.env.VUE_APP_CLOSE_ENV_TIPS);
const envTipsDuration = parseInt(process.env.VUE_APP_ENV_TIPS_DURATION) || 10;
const envTipsText = parseInt(process.env.VUE_APP_ENV_TIPS_TEXT) || `This is the ${VUE_APP_ENV} environment`;

function translateColor(color) {
  try {
    const [r, g, b, a] = color.match(/rgba?\((.*)\)/)[1].split(/, ?/);
    return `rgba(${r}, ${g}, ${b}, ${(a || 1) / 4})`
  } catch (e) {
    return 'rgba(144, 147, 153, 0.5)';
  }
}

export default function alertEnvTips() {
  //  如果是正式环境，或者 VUE_APP_CLOSE_ENV_TIPS 为 true，就不要显示环境提示
  if (VUE_APP_ENV === 'production' || closeEnvTips) {
    return;
  }

  const instance = new (Vue.extend(Watermark))().$mount();
  Object.assign(instance.$props, {
    text: envTipsText,
  });
  if (document.body.firstChild.before) {
    document.body.firstChild.before(instance.$el);
  } else {
    document.body.insertBefore(instance.$el, document.body.firstChild);
  }
}

