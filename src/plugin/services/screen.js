import Vue from 'vue';
import _ from 'lodash';

class ScreenService {
  state = Vue.observable({ innnerWidth: window.innerWidth });
  xs = 768;
  md = 992;
  lg = 1200;

  constructor() {
    window.addEventListener('resize', _.debounce(() => {
      this.state.innnerWidth = window.innerWidth;
    }, 500));
  }

  get innerWidth() {
    return this.state.innnerWidth;
  }

  get isXs() {
    return this.innerWidth < this.xs;
  }

  get isSm() {
    return this.innnerWidth >= this.xs && this.innnerWidth < this.md;
  }

  get isMd() {
    return this.innnerWidth >= this.md && innerWidth < this.lg;
  }

  get isLg() {
    return this.innnerWidth >= this.lg;
  }
}

export const screenService = new ScreenService();
