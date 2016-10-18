import scope from '~/app/api/scope'
import {
  // ADD_DECK,
  RECEIVE_DECKS,
  SET_CURRENT_DECK,
  DECKS_IN_LOADING
} from '../mutation-types'

// initial state
const state = {
  all: [],
  currentDeckId: null,
  loading: false
}

// mutations
const mutations = {
  [DECKS_IN_LOADING] (state) {
    state.loading = true
  },
  [RECEIVE_DECKS] (state, decks) {
    state.loading = false
    state.all = decks
  },
  [SET_CURRENT_DECK] (state, deckId) {
    state.currentDeckId = deckId
  }
}

const actions = {
  setCurrentDeck: ({ dispatch, commit, state }, deckId) => {
    if (state.all.length <= 0) {
      dispatch('getAllDecks')
    }
    commit(SET_CURRENT_DECK, deckId)
  },
  getAllDecks: ({ commit }) => {
    commit(DECKS_IN_LOADING)
    scope.getDecks(decks => {
      commit(RECEIVE_DECKS, decks)
    })
  },
  addDeck: ({ commit }, deck) => {
    commit(DECKS_IN_LOADING)
    scope.addDeck(deck, decks => {
      commit(RECEIVE_DECKS, decks)
    })
  },
  updateDeck: ({ commit }, deck) => {
    // commit(types.DECKS_IN_LOADING)
    scope.updateDeck(deck, decks => {
      commit(RECEIVE_DECKS, decks)
    })
  },
  deleteDeck: ({ commit }, deck) => {
    // commit(types.DECKS_IN_LOADING)
    scope.deleteCard(deck, decks => {
      commit(RECEIVE_DECKS, decks)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
