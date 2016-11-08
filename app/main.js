import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Vuex from 'vuex'
// import Validator from 'vue-validator'

// require('./logmatic-config')

import { routesMap, configRouter } from './route-config'

Vue.config.devtools = true

Vue.use(Router)
Vue.use(Resource)
Vue.use(Vuex)
// Vue.use(Validator)

Vue.http.options.root = process.env.API_ROOT + '/api/v1'

const router = new Router({
  routes: routesMap,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      console.log(savedPosition)
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

configRouter(router)

// boostrap the app
/* eslint-disable no-new */
import App from './App'
new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
