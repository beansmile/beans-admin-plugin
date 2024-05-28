import Vue from 'vue'
import Watermark from '../components/watermark.vue';

const vueAppEnv = process.env.VUE_APP_ENV || 'development';
const closeEnvWatermark = Boolean(process.env.VUE_APP_CLOSE_ENV_WATERMARK);
const envWatermarkText = process.env.VUE_APP_ENV_WATERMARK_TEXT || `This is the ${vueAppEnv} environment`;

export default function alertEnvTips() {
  //  如果是正式环境，或者 VUE_APP_CLOSE_ENV_TIPS 为 true，就不要显示环境提示
  if (vueAppEnv === 'production' || closeEnvWatermark) {
    return;
  }

  const instance = new (Vue.extend(Watermark))().$mount();
  Object.assign(instance.$props, {
    text: envWatermarkText,
  });
  if (document.body.firstChild.before) {
    document.body.firstChild.before(instance.$el);
  } else {
    document.body.insertBefore(instance.$el, document.body.firstChild);
  }
}

