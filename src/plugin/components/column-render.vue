<script>
import Moment from './moment';
import _ from 'lodash';
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
import ResourceRender from './resource-render';
import { abilityService } from '../services';
import UncontrolledInput from './form/uncontrolled-input';
import SkuEditor from './sku-editor';
import DialogForm from './form/dialog';
import ImportButton from './import-button';

const RenderDate = {
  functional: true,
  render(h, context) {
    const data = _.merge({}, context.data, { props: { format: 'YYYY-MM-DD' } });
    return h(Moment, data, context.children);
  }
}

const DateTime = {
  functional: true,
  render(h, context) {
    const data = _.merge({}, context.data, { props: { format: 'YYYY-MM-DD HH:mm' } });
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

const DateTimePicker = {
  functional: true,
  render(h, context) {
    const data = _.merge({}, context.data, { props: { type: 'datetime' } });
    return h('el-date-picker', data, context.children);
  }
}

export const RenderHtml = {
  functional: true,
  render(h, context) {
    return <div class="html-content" domProps={{ innerHTML: context.props.value }}/>
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
    const { options } = context.props;
    return (
      <el-radio-group {...context} on={context.listeners}>
        {options.map(option => (
          <el-radio label={option.value}>{option.label}</el-radio>
        ))}
      </el-radio-group>
    )
  }
}

export const StorageAttachment = {
  functional: true,
  render(h, context) {
    const { value, style, width, height, borderRadius = 0, ...opts } = context.props;
    const attachments = _.flatten([value]).filter(Boolean);
    const fit = opts.fit || opts.objectFit || 'contain';
    const componentStyle = { ...style, width, height, borderRadius };
    return (
      <div class="multi-attachments" onClick={e => e.stopPropagation()}>
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

export const LocaleRouteButton = {
  functional: true,
  render(h, context) {
    const locales = _.get(context.parent, '$vadminConfig.i18n.locales') || [];
    const buttonName = context.children || context.props.label || context.props.title || context.parent.$t('bean.link');
    const to = context.props.to;
    return (
      <el-dropdown>
        <el-button type="primary" size="mini">
          {buttonName}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>

        <el-dropdown-menu slot="dropdown">
          {
            _.map(locales, (localeName, localeValue) => (
              <el-dropdown-item style="padding: 0;">
                <Link to={_.merge({}, to, { query: { locale: localeValue } })} style="padding: 0 15px; color: inherit; width: 100%; height: 100%;">{localeName}</Link>
              </el-dropdown-item>
            ))
          }
        </el-dropdown-menu>
      </el-dropdown>
    );
  }
}

export const RouteButton = {
  functional: true,
  render(h, context) {
    const buttonName = context.children || context.props.label || context.props.title || context.parent.$t('bean.link');
    return (
      <Link {...context}>
        <el-button type="primary" size="mini" props={context.props}>{buttonName}</el-button>
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
    if (!abilityService.can(can)) {
      return null;
    }
    return (
      // elementui 这里的事件名是onConfirm, onCancel...
      <el-popconfirm
        title={`${context.parent.$t('bean.actionConfirm')} ${buttonName}？`}
        on={context.listeners}
        onOnConfirm={context.listeners.confirm || _.noop}
        onOnCancel={context.listeners.cancel || _.noop}
        scopedSlots={{
          reference: () => <el-button type={buttonType} size="mini">{buttonName}</el-button>
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
    return (
      <DialogForm
        title={buttonName}
        columns={context.props.columns}
        value={context.props.value}
        submitHandler={context.props.submitHandler}
        on={context.listeners}
        props={context.props}
      >
        <el-button type="primary" size="mini">{buttonName}</el-button>
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

const COMPONENT_PRE_INSTALLED = {
  ..._.mapKeys(Element, (value, key) => key.charAt(0).toLowerCase() + key.slice(1)),
  moment: Moment,
  date: RenderDate,
  time: DateTime,
  textarea: TextArea,
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
  upload: Upload,
  storageAttachment: StorageAttachment,
  editor: CKEditor,
  radioGroup: RadioGroup,
  listSelect: ListSelect,
  linkSelect: LinkSelect,
  pageEditor: PageGenerator,
  pageGenerator: PageGenerator,
  mail: Mail,
  uncontrolledInput: UncontrolledInput,
  uncontrolledTextarea: UncontrolledTextArea,
  resourceRender: ResourceRender,
  localeRouteButton: LocaleRouteButton,
  skuEditor: SkuEditor,
  importButton: RenderImportButton
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

export default {
  functional: true,
  render(h, context) {
    const { renderCell } = context.props;
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
</script>
