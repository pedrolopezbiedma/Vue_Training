import Vue from 'vue'
import Router from 'vue-router'
import Gmap from './views/GMap.vue'
import Signup from './views/Signup.vue'
import Login from './views/Login.vue'
import ViewProfile from './views/ViewProfile.vue'
import firebase from 'firebase'

Vue.use(Router)

//export default new Router({
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'gmap',
      component: Gmap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'login',
      component: Login     
    },
    {
      path: '/profile/:user_id',
      name: 'viewProfile',
      component: ViewProfile,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // If any of the router record requires authentication, we check if the user is logged.
    let user = firebase.auth().currentUser
    if(user){
      // If user is logged, then they can continue
      next()
    }
    else{
      // If user is not logged, then we redirect then to the login page.
      next({ name: 'login'})
    }
  }
  else{
    next()
  }
})

export default router;