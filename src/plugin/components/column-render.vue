<script>
import Moment from './moment';
import _ from 'lodash';
import { isMobile } from '../utils';
import NestForm from './form/nest';
import StaticNestForm from './form/static-nest';
import FormSelect from './form/select';
import Upload from './form/upload';
import { Element } from '../element';
import Table from './table';
import CKEditor from './ck-editor';
import Link from './link';
import ListSelect from './list-select';
import LinkSelect from './link-select';
import PageGenerator from './page-generator';
import PageCreator from './page-creator';
import ResourceRender from './resource-render';
import { abilityService } from '../services';
import UncontrolledInput from './form/uncontrolled-input';
import SkuEditor from './sku-editor';
import DialogForm from './form/dialog';
import ImportButton from './import-button';
import DropdownButton from './dropdown-button';
import List from './list';
import MarkdownEditor from './markdown-editor';
import RichText from './rich-text';
import TrimInput from './form/trim-input';

const RenderDate = {
  functional: true,
  render(h, context) {
    const data = _.merge({}, { props: { format: 'YYYY-MM-DD' } }, context.data);
    return h(Moment, data, context.children);
  }
}

const DateTime = {
  functional: true,
  render(h, context) {
    const data = _.merge({}, { props: { format: 'YYYY-MM-DD HH:mm:ss' } }, context.data);
    return h(Moment, data, context.children);
  }
}

const TextArea = {
  functional: true,
  render(h, context) {
    const data = _.merge({ attrs: { rows: 10 } }, context.data, { props: { type: 'textarea' } });
    return h('el-input', data, context.children);
  }
}

const UncontrolledTextArea = {
  functional: true,
  render(h, context) {
    const data = _.merge({ attrs: { rows: 10, type: 'textarea' } }, context.data);
    return h(UncontrolledInput, data, context.children);
  }
}

function triggerEvent(event, ...args) {
  if (_.isArray(event)) {
    event.forEach(function(eventFn) {
      triggerEvent(eventFn, ...args);
    });
    return;
  }
  if (_.isFunction(event)) {
    event.call(this, ...args);
  }
}

const DatePicker = {
  functional: true,
  render(h, context) {
    const change = _.get(context, 'data.on.change');
    // 不触发datepicker的input事件了，都用change
    // column-render-helper组件拦截了input事件，会导致datepicker组件validator取到错误的value
    const handleInput = function(val) {
      triggerEvent(change, val);
    }
    // 移动端默认editable false
    const data = { ...context.data, props: { editable: !isMobile, ...context.data.props }, on: { ..._.omit(context.data.on, 'input'), input: handleInput } };
    return h('el-date-picker', data, context.children);
  }
}

const DateTimePicker = {
  functional: true,
  render(h, context) {
    const data = _.merge({}, { props: { type: 'datetime' } }, context.data);
    return h(DatePicker, data, context.children);
  }
}

export const RenderHtml = {
  functional: true,
  render(h, context) {
    return h(RichText, _.merge({ type: 'richText' }, context.data), context.children);
  }
}

export const BoolTag = {
  functional: true,
  render(h, context) {
    const map = {
      true: { type: 'success', name: context.parent.$t('bean.yes') },
      false: { type: 'danger', name: context.parent.$t('bean.no') }
    }
    const bool = Boolean(context.props.value);
    return <el-tag type={map[bool].type}>{map[bool].name}</el-tag>
  }
}

const RadioGroup = {
  functional: true,
  render(h, context) {
    const { options, isButtonStyle = false, ...props } = context.props;
    const componentName = isButtonStyle ? 'el-radio-button' : 'el-radio';
    return (
      <el-radio-group props={props} on={context.listeners}>
        {options.map(option => (
          h(componentName, { props: { ..._.omit(option, 'value'), label: option.value } }, option.label)
        ))}
      </el-radio-group>
    )
  }
}

const CheckboxGroup = {
  functional: true,
  render(h, context) {
    const { options, isButtonStyle = false, value = [], ...props } = context.props;
    const componentName = isButtonStyle ? 'el-checkbox-button' : 'el-checkbox';
    return (
      <el-checkbox-group value={value} props={props} on={context.listeners}>
        {options.map(option => (
          h(componentName, { props: { ..._.omit(option, 'value'), label: option.value } }, option.label)
        ))}
      </el-checkbox-group>
    )
  }
}

export const StorageAttachment = {
  functional: true,
  render(h, context) {
    const { value, style, width, height, borderRadius = 0, className = '', ...opts } = context.props;
    const attachments = _.flatten([value]).filter(Boolean);
    const fit = opts.fit || opts.objectFit || 'contain';
    const componentStyle = { ...style, width, height, borderRadius };
    return (
      <div class={`multi-attachments ${className}`} onClick={e => e.stopPropagation()}>
        {
          attachments.map((attachment, index) => {
            if (!attachment.content_type) return;
            const previewSrcList = attachments.slice(index, attachments.length).concat(attachments.slice(0, index)).
                filter((attachment) => { return attachment.content_type.match(/image/) }).
                map((attachment) => { return attachment.url });
            const imageProps = { previewSrcList, fit, ...opts.imageProps };
            return <ResourceRender
              imageProps={imageProps}
              videoProps={opts.videoProps}
              style={componentStyle}
              value={attachment}
              key={index}
            />;
          })
        }
      </div>
    );
  }
}

export const Button = {
  functional: true,
  render(h, context) {
    const can = context.props.can;
    if (!abilityService.can(can)) {
      return null;
    }
    const buttonName = context.children || context.props.label || context.props.title;
    return h('el-button', _.merge({}, { on: context.listeners }, context), buttonName);
  }
}

export const RouteButton = {
  functional: true,
  render(h, context) {
    const buttonName = context.children || context.props.label || context.props.title || context.parent.$t('bean.link');
    return (
      <Link {...context.data}>
        <el-button type="primary" props={context.props}>{buttonName}</el-button>
      </Link>
    )
  }
}

export const ConfirmButton = {
  functional: true,
  render(h, context) {
    const buttonName = context.children || context.props.label || context.props.title || context.parent.$t('bean.actionDelete');
    const can = context.props.can;
    const buttonType = context.props.type || 'danger'
    if (can && (!abilityService.can(can))) {
      return null;
    }
    return (
      <el-popconfirm
        title={`${context.parent.$t('bean.actionConfirm')} ${buttonName}？`}
        on={context.listeners}
        confirm-button-text={context.parent.$t('bean.actionConfirm')}
        cancel-button-text={context.parent.$t('bean.actionCancel')}
        scopedSlots={{
          reference: () => <el-button onClick={e => e.stopPropagation()} type={buttonType}>{buttonName}</el-button>
        }}
        props={context.props}
      >
      </el-popconfirm>
    )
  }
}

export const DialogFormButton = {
  functional: true,
  render(h, context) {
    const buttonName = context.children || context.props.label || context.props.title || context.parent.$t('bean.link');
    const can = context.props.can;
    if (!abilityService.can(can)) {
      return null;
    }
    const triggerButtonProps = _.merge({ type: 'primary' }, context.props.triggerButtonProps);
    return (
      <DialogForm
        title={buttonName}
        on={context.listeners}
        props={context.props}
      >
        <el-button props={triggerButtonProps}>{buttonName}</el-button>
      </DialogForm>
    )
  }
}

export const Mail = {
  functional: true,
  render(h, context) {
    const value = context.props.value;
    return <a href={`mailto:${value}`}>{value}</a>
  }
}

export const RenderImportButton = {
  functional: true,
  render(h, context) {
    const can = context.props.can;
    if (!abilityService.can(can)) {
      return null;
    }
    return <ImportButton props={context.props}></ImportButton>
  }
}

const AdminInput = {
  functional: true,
  render(h, context) {
    const trim = context.props.trim;
    return h(trim ? TrimInput : 'el-input', context.data, context.children);
  }
}

const COMPONENT_PRE_INSTALLED = {
  ..._.mapKeys(Element, (value, key) => key.charAt(0).toLowerCase() + key.slice(1)),
  moment: Moment,
  date: RenderDate,
  time: DateTime,
  textarea: TextArea,
  datePicker: DatePicker,
  dateTimePicker: DateTimePicker,
  routeButton: RouteButton,
  confirmButton: ConfirmButton,
  nestForm: NestForm,
  staticNestForm: StaticNestForm,
  dialogFormButton: DialogFormButton,
  select: FormSelect,
  table: Table,
  bool: BoolTag,
  html: RenderHtml,
  richText: RichText,
  upload: Upload,
  storageAttachment: StorageAttachment,
  editor: CKEditor,
  markdownEditor: MarkdownEditor,
  radioGroup: RadioGroup,
  checkboxGroup: CheckboxGroup,
  listSelect: ListSelect,
  linkSelect: LinkSelect,
  pageEditor: PageGenerator,
  pageGenerator: PageGenerator,
  pageCreator: PageCreator,
  mail: Mail,
  uncontrolledInput: UncontrolledInput,
  uncontrolledTextarea: UncontrolledTextArea,
  resourceRender: ResourceRender,
  skuEditor: SkuEditor,
  importButton: RenderImportButton,
  dropdownButton: DropdownButton,
  button: Button,
  list: List,
  input: AdminInput,
  trimInput: TrimInput,
}

function getRenderContext({ context, config = {} }) {
  const data = _.pick(config, ['class', 'style', 'attrs', 'domProps', 'nativeOn', 'directives', 'scopedSlots', 'slot', 'key', 'ref', 'refInFor']);
  const props = { ...context.data.attrs, ...config.props };
  const defaultEvents = _.map(context.data.on, (eventHandler, eventName) => ({ eventName, eventHandler }));
  const events = _.map(config.on, (eventHandler, eventName) => ({ eventName, eventHandler }));
  const on = _.mapValues(_.groupBy(defaultEvents.concat(events), 'eventName'), v => v.map(item => item.eventHandler));
  return { on, props, ...data };
}

function componentRender(h, {
  component,
  context,
  config = {}
}) {
  return h(component, getRenderContext({ context, config }), context.children);
}

const ColumnRender = {
  functional: true,
  render(h, context) {
    const { renderCell } = context.props;
    const can = _.get(renderCell, 'can');
    if (!abilityService.can(can)) {
      return null;
    }
    if (_.get(renderCell, 'component')) {
      if (_.isFunction(renderCell.component)) {
        return renderCell.component(h, getRenderContext({ context, config: renderCell }));
      }
      const component = COMPONENT_PRE_INSTALLED[renderCell.component] || renderCell.component;
      return componentRender(h, { component, context, config: renderCell });
    }
    if (_.isFunction(renderCell)) {
      return renderCell(h, getRenderContext({ context }));
    }
    if (COMPONENT_PRE_INSTALLED[renderCell]) {
      return componentRender(h, { component: COMPONENT_PRE_INSTALLED[renderCell], context });
    }
    return componentRender(h, { component: renderCell, context });
  }
}

export default ColumnRender;
</script>
