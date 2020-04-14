import Vue from 'vue';
import { Dialog } from 'element-ui';
import { i18n } from '../i18n';

export default function createDialog({ props = {}, slots = {}, events = {} } = {}) {
  const DialogConstructor = Vue.extend(Dialog);
  const instance = new DialogConstructor({
    i18n,
    propsData: {
      ...props
    },
  });
  instance.$mount();

  instance.$slots.default = slots.default;
  instance.$slots.title = slots.title;
  instance.$slots.footer = slots.footer;

  const {
    open,
    opened,
    close,
    closed
  } = events;
  instance.$on('open', () => {
    open && open(instance);
  });

  instance.$on('opened', () => {
    opened && opened(instance);
  });

  instance.$on('close', () => {
    close && close(instance);
  });

  instance.$on('closed', () => {
    closed && closed();
    document.body.removeChild(instance.$el);
  });

  document.body.appendChild(instance.$el);
  instance.visible = true;

  return instance;
}
