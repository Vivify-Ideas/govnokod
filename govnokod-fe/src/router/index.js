import Vue from 'vue'
import Router from 'vue-router'

import { getAuthToken } from './../helpers'
import { ROUTES } from './routes'

Vue.use(Router)

const router = new Router({
  routes: ROUTES
})

// guards
router.beforeEach((to, from, next) => {
  const token = getAuthToken();
  if ((to.meta.guest && token) || (to.meta.auth && !token)) {
    return next({
      name: 'home'
    })
  }
  return next()
})

export default router