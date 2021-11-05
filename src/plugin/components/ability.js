import { abilityService } from '../services';

export default {
  functional: true,
  render(h, context) {
    const { can } = context.props;
    if (abilityService.can(can)) {
      return context.children;
    }
    return null;
  }
}
