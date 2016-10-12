import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Vuex from 'vuex'
// import Keen from 'keen-ui'
// import Validator from 'vue-validator'

import { routesMap, configRouter } from './route-config'

Vue.config.devtools = true

Vue.use(Router)
Vue.use(Resource)
Vue.use(Vuex)
// Vue.use(Keen)
// Vue.use(Validator)

const router = new Router({
  routes: routesMap,
  mode: 'history',
  scrollBehavior (/* to, from, savedPosition */) {
    return { x: 0, y: 0 }
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
