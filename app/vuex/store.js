// vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
// import parts from modules
import prefs from './modules/prefs'
import cards from './modules/cards'
import decks from './modules/decks'
import tags from './modules/tags'
import user from './modules/user'

Vue.use(Vuex)
Vue.config.debug = true

export default new Vuex.Store({
  modules: {
    prefs,
    cards,
    decks,
    tags,
    user
  },
  strict: true
})
