import scope from '~/app/api/scope'
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

const actions = {
  addCard: ({ commit, state, rootState }, card) => {
    commit(CARDS_IN_LOADING)
    scope.addCard(card, rootState.decks.currentDeckId, cards => {
      commit(RECEIVE_CARDS, cards)
    })
  },
  updateCard: ({ commit }, card) => {
    // commit(types.CARDS_IN_LOADING)
    scope.updateCard(card, cards => {
      commit(RECEIVE_CARDS, cards)
    })
  },
  deleteCard: ({ commit }, card) => {
    // commit(types.CARDS_IN_LOADING)
    scope.deleteCard(card, cards => {
      commit(RECEIVE_CARDS, cards)
    })
  },
  getCards: ({ commit, state, rootState }) => {
    commit(CARDS_IN_LOADING)
    scope.getCards(rootState.decks.currentDeckId, cards => {
      commit(RECEIVE_CARDS, cards)
    })
  },
  getAllCards: ({ commit }) => {
    commit(CARDS_IN_LOADING)
    scope.getAllCards(cards => {
      commit(RECEIVE_CARDS, cards)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
