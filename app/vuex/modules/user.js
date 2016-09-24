import {
  // ADD_CARD,
  RECEIVE_PROFILE,
  USER_IN_LOADING
} from '../mutation-types'

// initial state
const state = {
  profile: null,
  loading: false
}

// mutations
const mutations = {
  // [ADD_CARD] (state, card) {
  //   state.all.push()
  // },
  [RECEIVE_PROFILE] (state, profile) {
    state.profile = profile
  },
  [USER_IN_LOADING] (state) {
    state.loading = true
  }
}

export default {
  state,
  mutations
}
