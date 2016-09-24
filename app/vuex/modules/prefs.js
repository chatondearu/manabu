import {
  SHOW_NAVIGATION,
  HIDE_NAVIGATION
} from '../mutation-types'

// initial state
const state = {
  showNavigation: false
}

// mutations
const mutations = {
  [SHOW_NAVIGATION] (state) {
    state.showNavigation = true
  },
  [HIDE_NAVIGATION] (state) {
    state.showNavigation = false
  }
}

export default {
  state,
  mutations
}
