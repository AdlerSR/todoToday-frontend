import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    popupState: 'disable',
    dropdownState: 'disable'
  },
  getters: {

  },
  mutations: {
    changePopup: (state, popup) => {
      state.popupState = popup;
    },

    changeDropdown: (state, dropdown) => {
      state.dropdownState = dropdown;
    }
  },
  actions: {
  },
  modules: {
  }
})
