import {
  Alert,
  Loading,
  Dialog,
  Pagination,
  MessageBox,
  Message,
  Card,
  Col,
  Image,
  Form,
  FormItem,
  Input,
  InputNumber,
  Button,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  Cascader,
  Switch,
  Slider,
  TimeSelect,
  TimePicker,
  DatePicker,
  ColorPicker,
  Transfer,
  Rate,
  Table,
  TableColumn,
  Submenu,
  Menu,
  MenuItem,
  Popconfirm,
  Tag,
  Tabs,
  TabPane,
  Row,
  Tree,
} from 'element-ui';

export const Element = {
  Alert,
  Dialog,
  Pagination,
  Card,
  Col,
  Image,
  Form,
  FormItem,
  Input,
  InputNumber,
  Button,
  Radio,
  RadioButton,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Select,
  Option,
  Cascader,
  Switch,
  Slider,
  TimeSelect,
  TimePicker,
  DatePicker,
  ColorPicker,
  Transfer,
  Rate,
  Table,
  TableColumn,
  Submenu,
  Menu,
  MenuItem,
  Popconfirm,
  Tag,
  Tabs,
  TabPane,
  Row,
  Tree
};

export default function (Vue) {
  Vue.use(Loading.directive);

  Vue
    .use(Alert)
    .use(Dialog)
    .use(Pagination)
    .use(Card)
    .use(Col)
    .use(Image)
    .use(Button)
    .use(Input)
    .use(InputNumber)
    .use(Form)
    .use(FormItem)
    .use(Radio)
    .use(RadioGroup)
    .use(RadioButton)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Cascader)
    .use(Select)
    .use(Option)
    .use(Switch)
    .use(Slider)
    .use(TimeSelect)
    .use(TimePicker)
    .use(DatePicker)
    .use(ColorPicker)
    .use(Transfer)
    .use(Rate)
    .use(Table)
    .use(TableColumn)
    .use(Submenu)
    .use(Menu)
    .use(MenuItem)
    .use(Popconfirm)
    .use(Tag)
    .use(Tabs)
    .use(TabPane)
    .use(Row)

  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;
}
