// 输出 element-ui 按需加载代码
const _ = require('lodash')

const arr = _.uniq(
  ['form', 'button', 'card', 'form-item', 'input', 'row', 'image', 'col', 'pagination', 'tooltip', 'dropdown', 'dropdown-menu', 'dropdown-item', 'dialog', 'tabs', 'tab-pane', 'checkbox-group', 'alert', 'table', 'table-column', 'option-group', 'option', 'select', 'menu', 'menu-item', 'submenu', 'tag', 'radio-group', 'radio', 'checkbox', 'checkbox-button', 'input-number', 'switch', 'date-picker', 'time-picker', 'color-picker', 'cascader', 'loading', 'message-box', 'notification', 'message', 'Carousel', 'CarouselItem', 'Popover', ]
)

const components = arr.map(text => _.upperFirst(_.camelCase(text)))

const code = `
import { ${components.join(', ')} } from 'element-ui;'

Vue${_.without(components, 'Loading', 'Notification', 'MessageBox', 'Message').map(v => `.use(${v})`).join('')};

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
`
console.log(code)

const vendor = arr.map(v => `'element-ui/lib/${v}'`).join(', ')

console.warn(vendor)
