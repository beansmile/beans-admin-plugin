import { abilityService } from '../services';
import ColumnRender from './column-render';

export default {
  functional: true,
  render(h, context) {
    const buttonName = context.children || context.props.label || context.props.title || context.parent.$t('bean.actionOperation');
    const { buttons, trigger = 'hover' } = context.props;
    const buttonsHasPermission = buttons
      .filter(item => {
        if (item) {
          if (item.can) {
            return abilityService.can(item.can);
          }
          return true;
        }
        return false;
      });
    if (buttonsHasPermission.length) {
      return (
        <el-dropdown trigger={trigger}>
          <el-button type="primary">{buttonName}<i class="el-icon-arrow-down el-icon--right" /></el-button>
          <el-dropdown-menu slot="dropdown" class="admin-dropdown-button-menu">
            { buttonsHasPermission.map((item, index) =>
              <el-dropdown-item key={index}>
                <ColumnRender renderCell={item} />
              </el-dropdown-item>
            )}
          </el-dropdown-menu>
        </el-dropdown>
      );
    }
    return null;
  }
}
