import {
  // ADD_CARD,
  RECEIVE_CARDS,
  CARDS_IN_LOADING
} from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  all: [],
  loading: false,
  currentCardId: null
}

// mutations
const mutations = {
  // [ADD_CARD] (state, card) {
  //   state.all.push()
  // },
  [CARDS_IN_LOADING] (state) {
    state.loading = true
  },
  [RECEIVE_CARDS] (state, cards) {
    state.loading = false
    state.all = cards
  }
}

export default {
  state,
  mutations
}
