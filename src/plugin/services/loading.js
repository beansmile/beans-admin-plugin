import Vue from 'vue';

class LoadingService {
  state = Vue.observable({ count: 0 });

  add() {
    this.state.count ++;
  }

  miuns() {
    this.state.count --;
  }
}

export const loadingService = new LoadingService();
