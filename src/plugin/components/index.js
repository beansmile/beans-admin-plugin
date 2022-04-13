import { RouteButton, ConfirmButton } from './column-render';
import Link from './link';
import PageGenerator from './page-generator'

export function install(Vue, config = {}) {
  const { componentPrefix } = config;
  [
    {
      name: 'form',
      component: require('./form/index').default
    },
    {
      name: 'nest-form',
      component: require('./form/nest').default
    },
    {
      name: 'dialog-form',
      component: require('./form/dialog').default
    },
    {
      name: 'upload-form',
      component: require('./form/upload').default
    },
    {
      name: 'select',
      component: require('./form/select').default
    },
    {
      name: 'filter',
      component: require('./form/filter').default
    },
    {
      name: 'upload',
      component: require('./upload/index').default
    },
    {
      name: 'table',
      component: require('./table').default
    },
    {
      name: 'pagination',
      component: require('./pagination').default
    },
    {
      name: 'source-page-table',
      component: require('./source-page/table').default
    },
    {
      name: 'source-page-form',
      component: require('./source-page/form').default
    },
    {
      name: 'source-page-show',
      component: require('./source-page/show').default
    },
    {
      name: 'source-page',
      component: require('./source-page/index').default
    },
    {
      name: 'nav-menu',
      component: require('./nav-menu').default
    },
    {
      name: 'nav-layout',
      component: require('./nav-layout').default
    },
    {
      name: 'route-button',
      component: RouteButton
    },
    {
      name: 'confirm-button',
      component: ConfirmButton
    },
    {
      name: 'ck-editor',
      component: require('./ck-editor').default
    },
    {
      name: 'markdown-editor',
      component: require('./markdown-editor').default
    },
    {
      name: 'link',
      component: Link
    },
    {
      name: 'permissions',
      component: require('./permissions').default
    },
    {
      name: 'list-select',
      component: require('./list-select').default
    },
    {
      name: 'link-select',
      component: require('./link-select').default
    },
    {
      name: 'export-button',
      component: require('./export-button').default
    },
    {
      name: 'import-button',
      component: require('./import-button').default
    },
    {
      name: 'lang-switcher',
      component: require('./lang-switcher').default
    },
    {
      name: 'resource-render',
      component: require('./resource-render').default
    },
    {
      name: 'page-generator',
      component: PageGenerator
    },
    {
      name: 'page-editor',
      component: PageGenerator
    },
    {
      name: 'sku-editor',
      component: require('./sku-editor').default
    },
    {
      name: 'route-tab',
      component: require('./route-tab').default
    },
    {
      name: 'attach-dir',
      component: require('./attach-dir').default
    },
    {
      name: 'image-area',
      component: require('./image-area').default
    },
    {
      name: 'page-creator',
      component: require('./page-creator').default
    },
    {
      name: 'list',
      component: require('./list').default
    },
    {
      name: 'ability',
      component: require('./ability').default
    },
    {
      name: 'column-render',
      component: require('./column-render').default
    },
    {
      name: 'rich-text',
      component: require('./rich-text').default
    }
  ].forEach(item => {
    Vue.component(`bean-admin-${item.name}`, item.component);
    Vue.component(`${componentPrefix}-${item.name}`, item.component);
  });
}
