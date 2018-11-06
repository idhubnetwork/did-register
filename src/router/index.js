import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import AddPublicKey from '@/pages/AddPublicKey'
import AddAuthentication from '@/pages/AddAuthentication'
import ValidAuthentication from '@/pages/ValidAuthentication'
import ValidPublicKey from '@/pages/ValidPublicKey'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Index },
    { path: '/addpublickey', component: AddPublicKey },
    { path: '/addauthentication', component: AddAuthentication },
    { path: '/validpublickey', component: ValidPublicKey },
    { path: '/validauthentication', component: ValidAuthentication }

  ]
})
