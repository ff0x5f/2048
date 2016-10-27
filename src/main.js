

import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
// import VueResource from 'vue-resource'
import routerConfig from './routes'

import FastClick from 'fastclick'

window.addEventListener('load', () => {
  FastClick.attach(document.body)
})

Vue.use(VueRouter)
// Vue.use(VueResource)
const router = new VueRouter({
  base: '/dist/',
  mode: 'history',
  routes: routerConfig
})

new Vue({
  router,
  el: '#app',
  template: '<App/>',
  components: { App }
})