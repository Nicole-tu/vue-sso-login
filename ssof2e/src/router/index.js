import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import ChooseUser from '../components/ChooseUser'
import KeyinPswd from '../components/KeyinPswd'
import KeyinUser from '../components/KeyinUser'
import VerifyUser from '../components/VerifyUser'

Vue.use(VueRouter)

const mixProps = function () {
  return route => {
    return Object.assign({}, route.params, route.query)
  }
}

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    props: mixProps(),
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    props: mixProps(),
    children: [
      {
        path: 'keyinuser',
        name: 'KeyinUser',
        component: KeyinUser
      },
      {
        path: 'chooseuser',
        name: 'ChooseUser',
        component: ChooseUser
      },
      {
        path: 'keyinpswd',
        name: 'KeyinPswd',
        component: KeyinPswd
      },
      {
        path: 'verifyuser',
        name: 'VerifyUser',
        component: VerifyUser
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
