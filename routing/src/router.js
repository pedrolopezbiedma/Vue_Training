import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from '@/views/About.vue'
import ViewProfile from '@/views/ViewProfile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/profile/:user_id',
      name: 'ViewProfile',
      component: ViewProfile
    }
  ]
})
