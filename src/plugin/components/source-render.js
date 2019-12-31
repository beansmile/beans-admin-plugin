import moment from 'moment';
import _ from 'lodash';
import { MessageBox } from 'element-ui';
import { permissionService } from '../services';
import Vue from 'vue';

// eslint-disable-next-line
export const renderCellByType = (h) => ({ column, scope }) => {
  const { row } = scope;
  const { prop, renderCell } = column;
  const value = _.get(row, prop)

  let type = _.isString(renderCell) ? renderCell : _.get(renderCell, 'type');
  const options = _.isObject(renderCell) ? renderCell : {};

  if (_.isFunction(type)) type = type(scope)

  switch (type) {
    case 'image': {
      const { width = '50px', height = '50px', borderRadius = 0, ...opts } = options;
      const fit = opts.fit || opts.objectFit || 'cover';
      const images = _.flatten([value]).filter(Boolean);
      if (!images.length) {
        return '/';
      }
      return (
        <div class="multi-images">
          {
            images.map(img =>
              <el-image
                class="image"
                style={{ width, height, borderRadius, ...opts }}
                src={img}
                fit={fit}
                preview-src-list={images}
              />
            )
          }
        </div>
      );
    }
    case 'video': {
      const { style = { height: '200px' } } = options;
      if (!value) {
        return '/'
      }
      return <video controls style={style} src={value}></video>
    }
    case 'time': {
      const format = options.format || 'YYYY-MM-DD HH:mm';
      if (!value) {
        return '/'
      }
      return moment(value).format(format);
    }
    case 'date': {
      const format = options.format || 'YYYY-MM-DD';
      if (!value) {
        return '/'
      }
      return moment(value).format(format);
    }
    case 'bool': {
      const textArr = options.textArr || ['否', '是'];
      const classArr = options.classArr || ['danger', '']
      const num = +Boolean(value);
      return <el-tag type={classArr[num]}>{textArr[num]}</el-tag>
    }
    case 'currency': {
      if (!value) {
        return '/'
      }
      if (!+value) {
        return value;
      }
      const { length = 2, prefix = '￥' } = options;
      return prefix + Number(value).toFixed(length);
    }
    case 'attachment': {
      if (!value) return '/';
      const { name = '下载' } = options;
      const renderLink = (href = '') => (
        <a href={href} style="display: block;" download>
          <el-button type="primary">{name}</el-button>
        </a>
      );
      if (_.isArray(value)) {
        return value.map(renderLink);
      }
      return renderLink(value);
    }
    case 'html': {
      if (!value) {
        return '/'
      }
      return <div class="markdown-body html-content" domProps={{ innerHTML: value }}/>
    }
    default:
      return value;
  }
}

export const renderAction = (h, { resource, actionButtonMode, actionButtonProps }) => ({ column, scope }) => {
  const actions = [
    {
      key: 'detail',
      render: ({ location, permission = `${resource}.read`, buttonText = '详情' }) => {
        const routeLocation = location || { name: `${resource}.show`, params: { id: scope.row.id } };
        return {
          permission,
          text: buttonText,
          handler: () => Vue.appRouter.push(routeLocation)
        }
      }
    },
    {
      key: 'edit',
      render: ({ location, permission = `${resource}.update`, buttonText = '编辑' }) => {
        const routeLocation = location || { name: `${resource}.edit`, params: { id: scope.row.id } };
        return {
          permission,
          text: buttonText,
          handler: () => Vue.appRouter.push(routeLocation)
        }
      }
    },
    {
      key: 'delete',
      render: ({ handler, permission = `${resource}.destroy`, buttonText = '删除' }) => {
        const showConfirm = async () => {
          // eslint-disable-next-line
          try { MessageBox.close() } catch (e) {}
          await MessageBox.confirm('删除操作不可恢复，确定删除？', buttonText);
          handler && await handler(scope);
        }
        return {
          permission,
          text: buttonText,
          handler: showConfirm
        }
      }
    }
  ]

  const renderActionButton = (action) => {
    let actionConfig = _.get(column, action.key) || {};
    if (_.isFunction(actionConfig)) {
      actionConfig = actionConfig(scope);
    }
    if (!actionConfig) return null;
    return column[action.key] && action.render(actionConfig || {});
  }

  // extraAction支持Array和Function
  // TODO 类型判断
  const extraAction = _.isFunction(column.extraAction) ? column.extraAction(h, scope) : column.extraAction;
  const buttons = actions
    .map(renderActionButton)
    .concat(extraAction)
    .filter(buttonConfig => {
      if (buttonConfig) {
        // 支持权限判断
        return permissionService.hasPermission(buttonConfig.permission);
      }
      return false;
    })
  // 第一个按钮（一般是详情）放在外面
  return [buttons.slice(0, 1), buttons.slice(1)]
    .map(item => <c-dropdown-button buttons={item} buttonMode={actionButtonMode} buttonProps={actionButtonProps} />)
}

export const sourceColumnRender = (h, params = {}) => ({ columns, column, scope }) => {
  const createElement = h;
  const { renderCell, prop, clipboard } = column;

  const renderedVNode = () => {
    if (prop === 'action') {
      return (
        <div class="cell-action">
          {renderAction(createElement, params)({ columns, column, scope })}
          {_.isFunction(renderCell) && renderCell(createElement, scope)}
        </div>
      );
    }
    if (_.isFunction(renderCell)) {
      return renderCell(createElement, scope);
    }
    if (_.isString(renderCell) || _.isObject(renderCell)) {
      return renderCellByType(createElement)({ column, scope });
    }

    const value = _.get(scope, `row.${prop}`, '/');

    return value === null ? '/' : value
  }

  const renderClipboard = (clipboard, vNode = null) => {
    return clipboard
      ? <c-clipboard props={_.isObject(clipboard) ? clipboard : {}}>{vNode}</c-clipboard>
      : vNode;
  }

  return renderClipboard(clipboard, renderedVNode());
}
