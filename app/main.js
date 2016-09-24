import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import Vuex from 'vuex'
import Keen from 'keen-ui'
// import Validator from 'vue-validator'

import { configRouter } from './route-config'

Vue.use(Router)
Vue.use(Resource)
Vue.use(Vuex)
Vue.use(Keen)
// Vue.use(Validator)

const router = new Router({
  history: true,
  saveScrollPosition: false
})

// configure router
configRouter(router)

// boostrap the app
const App = Vue.extend(require('./app.vue'))
router.start(App, '#app')
