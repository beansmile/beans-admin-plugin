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

  const type = _.isString(renderCell) ? renderCell : _.get(renderCell, 'type');
  const options = _.isObject(renderCell) ? renderCell : {};

  switch (type) {
    case 'image': {
      const { width = '50px', height = '50px', borderRadius = 0, objectFit = 'cover', ...opts } = options;
      if (value instanceof Array) {
        return (
          <div class="multi-images">
            {
              value.map(img =>
                <c-preview-image current={img}><img src={img} style={{ width, height, borderRadius, objectFit, ...opts }} /></c-preview-image>
              )
            }
          </div>
        )
      } else {
        return value && <c-preview-image current={value}><img src={value} style={{ width, height, borderRadius, objectFit, ...opts }} /></c-preview-image>;
      }
    }
    case 'video': {
      const { style = { height: '200px' } } = options;
      return value && <video controls style={style} src={ value }></video>
    }
    case 'time': {
      const format = options.format || 'YYYY-MM-DD HH:mm';
      return value && moment(value).format(format);
    }
    case 'date': {
      const format = options.format || 'YYYY-MM-DD';
      return value && moment(value).format(format);
    }
    case 'bool': {
      const textArr = options.textArr || ['否', '是'];
      const classArr = options.classArr || ['danger', '']
      const num = +Boolean(value);
      return <el-tag type={classArr[num]}>{textArr[num]}</el-tag>
    }
    case 'currency': {
      if (!+value) {
        return value;
      }
      const { length = 2, prefix = '￥' } = options;
      return prefix + Number(value).toFixed(length);
    }
    case 'attachment': {
      if (!value) return '/';
      const { name = '下载' } = options;
      const renderLink = (href = '') => <a href={href} style="display: block;" download><el-button type="primary">{name}</el-button></a>;
      if (_.isArray(value)) {
        return value.map(renderLink);
      }
      return renderLink(value);
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
        if (permissionService.hasPermission(permission)) {
          return {
            text: buttonText,
            handler: () => Vue.appRouter.push(routeLocation)
          }
        }
      }
    },
    {
      key: 'edit',
      render: ({ location, permission = `${resource}.update`, buttonText = '编辑' }) => {
        const routeLocation = location || { name: `${resource}.edit`, params: { id: scope.row.id } };
        if (permissionService.hasPermission(permission)) {
          return {
            text: buttonText,
            handler: () => Vue.appRouter.push(routeLocation)
          }
        }
      }
    },
    {
      key: 'delete',
      render: ({ handler, permission = `${resource}.destroy`, buttonText = '删除' }) => {
        const showConfirm = async() => {
          // eslint-disable-next-line
          try { MessageBox.close() } catch (e) { }
          await MessageBox.confirm('删除操作不可恢复，确定删除？', buttonText);
          handler && await handler(scope);
        }
        if (permissionService.hasPermission(permission)) {
          return {
            text: buttonText,
            handler: showConfirm
          }
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
    .filter(Boolean);
  return <c-dropdown-button buttons={buttons} buttonMode={actionButtonMode} buttonProps={actionButtonProps} />
}

export const sourceColumnRender = (h, params = {}) => ({ columns, column, scope }) => {
  const createElement = h;
  const { renderCell, prop } = column;

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
  return null;
}
