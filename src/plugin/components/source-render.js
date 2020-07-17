import Vue from 'vue';
import moment from 'moment';
import _ from 'lodash';
import { MessageBox } from 'element-ui';
import { permissionService } from '../services';
import { i18n } from '../i18n';

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
            images.map((img, index) => {
              const previewSrcList = images.slice(index, images.length).concat(images.slice(0, index));

              return (
                <el-image
                  class="image"
                  style={{ width, height, borderRadius, ...opts }}
                  src={img}
                  fit={fit}
                  preview-src-list={previewSrcList}
                />
              )
            })
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
      const { textArr = [i18n.t('否'), i18n.t('是')], classArr = ['danger', ''], ...opts } = options;
      delete opts['type'];
      const num = +Boolean(value);
      return <el-tag type={classArr[num]} props={opts}>{ textArr[num] }</el-tag>
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
      const { name = i18n.t('下载') } = options;
      const renderLink = (href = '') => (
        <a href={href} style="display: block;" download>
          <el-button type="primary">{ name }</el-button>
        </a>
      );
      if (_.isArray(value)) {
        return value.map(renderLink);
      }
      return renderLink(value);
    }
    case 'storageAttachment': {
      // 50px的话，视频太小了，所以改用100px
      const { width = '100px', height = '100px', borderRadius = 0, ...opts } = options;
      const attachments = _.flatten([value]).filter(Boolean);
      const fit = opts.fit || opts.objectFit || 'cover';

      if (!attachments.length) {
        return '/';
      }

      return (
        <div class="multi-attachments">
          {
            attachments.map((attachment, index) => {
              if (!attachment.content_type) return;
              if (attachment.content_type.match(/image/)) {
                const previewSrcList = attachments.slice(index, attachments.length).concat(attachments.slice(0, index)).
                  filter((attachment) => { return attachment.content_type.match(/image/) }).
                  map((attachment) => { return attachment.url })

                return (
                  <div>
                    <el-image
                      class="image"
                      style={{ width, height, borderRadius, ...opts }}
                      src={attachment.url}
                      fit={fit}
                      preview-src-list={previewSrcList}
                    />
                  </div>
                )
              } else if (attachment.content_type.match(/video/)) {
                return <div><video controls style={{ height, ...opts }} src={attachment.url}></video></div>
              } else {
                return (
                  <div><a href={attachment.url} style="display: block;" download>
                    <el-button type="primary">{attachment.filename}</el-button>
                  </a></div>
                )
              }
            })
          }
        </div>
      );
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
      render: ({ location, permission = `${resource}.read`, buttonText = i18n.t('详情') }) => {
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
      render: ({ location, permission = `${resource}.update`, buttonText = i18n.t('编辑') }) => {
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
      render: ({ handler, permission = `${resource}.destroy`, buttonText = i18n.t('删除') }) => {
        const showConfirm = async () => {
          // eslint-disable-next-line
          try { MessageBox.close() } catch (e) {}
          await MessageBox.confirm(i18n.t('删除操作不可恢复，确定删除？'), buttonText);
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
    if (_.isString(renderCell)) {
      return renderCellByType(createElement)({ column, scope });
    }
    if (_.isPlainObject(renderCell)) {
      if (renderCell.template) {
        // TODO 饶了一个圈
        return <v-node render-node={() => new Vue(renderCell).$mount()._vnode} />
      }
      return renderCellByType(createElement)({ column, scope });
    }

    const value = _.get(scope, `row.${prop}`, '/');

    return (value === null || value === '') ? '/' : value
  }

  const renderClipboard = (clipboard, vNode = null) => {
    return clipboard
      ? <c-clipboard props={_.isObject(clipboard) ? clipboard : {}}>{ vNode }</c-clipboard>
      : vNode;
  }

  return renderClipboard(clipboard, renderedVNode());
}
