// vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
// import parts from modules
import decks from './modules/decks'
import notes from './modules/notes'
import tags from './modules/tags'
import user from './modules/user'

Vue.use(Vuex)
Vue.config.debug = true

export default new Vuex.Store({
  modules: {
    decks,
    notes,
    tags,
    user
  },
  strict: true
})
