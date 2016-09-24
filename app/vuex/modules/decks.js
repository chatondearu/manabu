import {
  ADD_DECK,
  RECEIVE_DECKS,
  SET_CURRENT_DECK
} from '../mutation-types'

// initial state
const state = {
  all: [],
  currentDeckId: null
}

// mutations
const mutations = {
  [ADD_DECK] () {},
  [RECEIVE_DECKS] (state, decks) {
    state.all = decks
  },
  [SET_CURRENT_DECK] (state, deckId) {
    state.currentDeckId = deckId
  }
}

export default {
  state,
  mutations
}
