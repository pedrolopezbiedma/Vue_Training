import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Global filters
Vue.filter( 'filterBody', value => {
  return value.toUpperCase();
})

new Vue({
  render: h => h(App),
}).$mount('#app')
