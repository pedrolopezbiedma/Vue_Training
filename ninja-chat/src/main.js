import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueChatScroll from 'vue-chat-scroll'

Vue.use(vueChatScroll)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
