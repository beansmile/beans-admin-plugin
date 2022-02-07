import Vue from 'vue';
import _ from 'lodash';

class ScreenService {
  state = Vue.observable({ innnerWidth: window.innerWidth });

  constructor() {
    window.addEventListener('resize', _.debounce(() => {
      this.state.innnerWidth = window.innerWidth;
    }, 500));
  }

  get breakPoint() {
    return {
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1920,
      ..._.get(Vue, 'vadminConfig.screen')
    }
  }

  get isMobile() {
    return this.isXs;
  }

  get isTablet() {
    return this.isSm || this.isMd;
  }

  get innerWidth() {
    return this.state.innnerWidth;
  }

  get isXs() {
    return this.innerWidth < this.breakPoint.sm;
  }

  get isSm() {
    return this.innerWidth >= this.breakPoint.sm && innerWidth < this.breakPoint.md;
  }

  get isMd() {
    return this.innerWidth >= this.breakPoint.md && innerWidth < this.breakPoint.lg;
  }

  get isLg() {
    return this.innerWidth >= this.breakPoint.lg;
  }
}

export const screenService = new ScreenService();
