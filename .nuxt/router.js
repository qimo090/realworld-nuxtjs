import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _04dd309c = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _18c5ded1 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _002e43b7 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _f259fb12 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _366545d6 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _0de35242 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _6d9d45c4 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _04dd309c,
    children: [{
      path: "/",
      component: _18c5ded1,
      name: "home"
    }, {
      path: "/login",
      component: _002e43b7,
      name: "login"
    }, {
      path: "/register",
      component: _002e43b7,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _f259fb12,
      name: "profile"
    }, {
      path: "/settings",
      component: _366545d6,
      name: "settings"
    }, {
      path: "/editor",
      component: _0de35242,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _6d9d45c4,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
