import Vue from 'vue'
import App from './App.vue'
import { apolloProvider } from './vue-apollo'
import router from './router'

import VueMaterial from 'vue-material'
import('./scss/settings.scss')

import store from './store'

Vue.config.productionTip = false

Vue.use(VueMaterial)

new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
