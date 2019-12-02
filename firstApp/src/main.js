// External Libraries
import VueRouter from 'vue-router'

// Components
import Vue from 'vue'
import App from './App'
import Posts from './components/Posts'
import Contacts from './components/Contacts'

Vue.config.productionTip = false

// Navigation
Vue.use(VueRouter);
const routes = [
  {
    path: '/',
    component: Posts
  },
  {
    path: '/contacts',
    component: Contacts
  }
];
const router = new VueRouter({routes: routes});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
