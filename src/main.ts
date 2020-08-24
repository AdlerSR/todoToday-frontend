import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$api = axios.create({
  baseURL: !process.env.VUE_APP_AXIOS_URL ? 'https://todotodayback.herokuapp.com/' : process.env.VUE_APP_AXIOS_URL
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
