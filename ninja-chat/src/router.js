import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/views/Welcome'
import Chat from  '@/views/Chat'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      props: true,
      beforeEnter: (to, from, next) => {
        if(to.params.filledName){
          console.log(to.params.filledName)
          next()
        }
        else{
          next({ name: 'Welcome'})
        }
      }
    }
  ]
})
