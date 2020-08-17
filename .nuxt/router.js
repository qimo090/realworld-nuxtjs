import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _01b1ef4a = () => interopDefault(import('../pages/layout' /* webpackChunkName: "" */))
const _6ad09a50 = () => interopDefault(import('../pages/home' /* webpackChunkName: "" */))
const _210a0fd0 = () => interopDefault(import('../pages/login' /* webpackChunkName: "" */))
const _5477bad0 = () => interopDefault(import('../pages/profile' /* webpackChunkName: "" */))
const _74004114 = () => interopDefault(import('../pages/settings' /* webpackChunkName: "" */))
const _194fa2c4 = () => interopDefault(import('../pages/editor' /* webpackChunkName: "" */))
const _86e33436 = () => interopDefault(import('../pages/article' /* webpackChunkName: "" */))

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
    component: _01b1ef4a,
    children: [{
      path: "/",
      component: _6ad09a50,
      name: "home"
    }, {
      path: "/login",
      component: _210a0fd0,
      name: "login"
    }, {
      path: "/register",
      component: _210a0fd0,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _5477bad0,
      name: "profile"
    }, {
      path: "/settings",
      component: _74004114,
      name: "settings"
    }, {
      path: "/editor",
      component: _194fa2c4,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _86e33436,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
