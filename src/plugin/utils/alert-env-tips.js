import { MessageBox, Alert } from 'element-ui';
import Vue from 'vue'

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

  // 一次会话中，如果弹过一次窗，就不要再弹窗了
  if (!window.sessionStorage.getItem('env_tips_is_alert')) {
    MessageBox.alert(envTipsText, 'Tips', {
      type: 'warning',
      showClose: false,
      callback: () => {
        window.sessionStorage.setItem('env_tips_is_alert', true);
      }
    });
  }

  const instance = new (Vue.extend(Alert))().$mount();
  Object.assign(instance.$props, {
    title: envTipsText,
    type: 'warning',
    closable: false,
    showIcon: true,
  });
  const wrapper = document.createElement('div');
  const backgroundDom = document.createElement('div');
  wrapper.appendChild(backgroundDom)
  backgroundDom.appendChild(instance.$el);
  Object.assign(instance.$el.style, {
    display: 'inline-flex',
    background: 'transparent',
    width: 'auto',
    animation: `${envTipsDuration}s linear 3s infinite alternate alertEnvTipsAnimation`,
  });
  if (document.body.firstChild.before) {
    document.body.firstChild.before(wrapper);
  } else {
    document.body.insertBefore(wrapper, document.body.firstChild);
  }

  setTimeout(() => {
    Object.assign(wrapper.style, {
      position: 'sticky',
      top: 0,
      zIndex: 999,
      overflow: 'hidden',
      background: '#fff',
    });
    Object.assign(backgroundDom.style, { background: translateColor(window.getComputedStyle(instance.$el).color) })
  }, 0);
}

