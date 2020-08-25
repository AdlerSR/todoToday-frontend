import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    popupState: 'disable'
  },
  getters: {

  },
  mutations: {
    changeState: (state, popup) => {
      state.popupState = popup;
    }
  },
  actions: {
  },
  modules: {
  }
})
