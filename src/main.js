import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../mock/mockServer' //加载mockServer
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
