import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import AddPublicKey from '@/pages/AddPublicKey'
import AddAuthentication from '@/pages/AddAuthentication'
import VerifyAuthentication from '@/pages/VerifyAuthentication'
import VerifyPublicKey from '@/pages/VerifyPublicKey'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Index },
    { path: '/addpublickey', component: AddPublicKey },
    { path: '/addauthentication', component: AddAuthentication },
    { path: '/verifypublickey', component: VerifyPublicKey },
    { path: '/verifyauthentication', component: VerifyAuthentication }

  ]
})
