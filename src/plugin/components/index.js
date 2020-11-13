import Vue from 'vue';

Vue.component('c-echarts', () => import('./custom-chart'));
Vue.component('c-editor', () => import('./ck-editor'));

Vue.component('c-source-detail', require('./source-detail').default);
Vue.component('c-source-filter', require('./source-filter').default);
Vue.component('c-source-form-item', require('./source-form-item').default);
Vue.component('c-source-form', require('./source-form').default);
Vue.component('c-source-page', require('./source-page').default);
Vue.component('c-source-table', require('./source-table').default);
Vue.component('c-upload', require('./upload').default);
Vue.component('c-upload-form-item', require('./upload-form-item').default);
Vue.component('c-nav-menu', require('./nav-menu').default);
Vue.component('c-preview-image', require('./preview-image').default);
Vue.component('v-node', require('./v-node').default);
Vue.component('c-dropdown-button', require('./dropdown-button').default);
Vue.component('c-link-button', require('./link-button').default);
Vue.component('c-pagination', require('./pagination').default);
Vue.component('c-select', require('./select').default);
Vue.component('c-nest-form', require('./dynamic-nest-form').default);
Vue.component('c-static-nest-form', require('./static-nest-form').default);
Vue.component('c-router-link', require('./router-link').default);
Vue.component('c-permission', require('./permission').default);
Vue.component('c-clipboard', require('./clipboard').default);
Vue.component('c-page-editor', require('./page-editor').default);
Vue.component('c-transfer', require('./transfer').default);
Vue.component('c-list-select', require('./list-select').default);
Vue.component('c-sku-editor', require('./sku-editor').default);
Vue.component('c-image-cropper', require('./image-cropper').default);
Vue.component('c-upload-single', require('./upload-single').default);
Vue.component('c-uncontrolled-input', require('./uncontrolled-input').default);

Vue.component('c-source-form-v2', require('./source-form-v2/index').default);
Vue.component('c-nest-form-v2', require('./source-form-v2/nest-form').default);
Vue.component('c-source-form-dialog', require('./source-form-v2/form-dialog').default);
