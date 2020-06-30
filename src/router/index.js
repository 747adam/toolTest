import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../pages/Index.vue'
import FormTest from '../pages/FormTest.vue'
import GtmTest from '../pages/GtmTest.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  // {
  //   path: '/form.html',
  //   name: 'form',
  //   component: FormTest
  // },
  {
    path: '/formTest.html',
    name: 'FormTest',
    component: FormTest
  },
  {
    path: '/gtmTest.html',
    name: 'GtmTest',
    component: GtmTest
  },
  {
    path: '*',
    redirect: { name: 'index' }
  }
]

let base = '/'
let project = process.env.project
try {
  const index = location.pathname.lastIndexOf(project) === -1 ? location.pathname.lastIndexOf(base) : location.pathname.lastIndexOf(project) + project.length
  base = location.pathname.substr(0, index) + '/'
} catch (err) {
  console.log(err)
}

const router = new VueRouter({
  mode: 'history',
  base,
  pathToRegexpOptions: {
    strict: true
  },
  routes
})

export default router
