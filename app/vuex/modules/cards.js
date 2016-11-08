import scope from 'app/api/scope'
import _ from 'lodash'

import {
  // ADD_CARD,
  RECEIVE_CARDS,
  CARDS_IN_LOADING
} from '../mutation-types'

// initial state
// shape: [{ id, quantity }]
const state = {
  all: [],
  currentCardId: null,
  loading: false
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
  addCard: ({ commit, rootState }, card) => {
    card = _.cloneDeep(card)
    commit(CARDS_IN_LOADING)
    scope.addCard(card, rootState.decks.currentDeckId, cards => {
      commit(RECEIVE_CARDS, cards)
    })
  },
  updateCard: ({ commit }, card) => {
    card = _.cloneDeep(card)
    commit(CARDS_IN_LOADING)
    scope.updateCard(card, cards => {
      commit(RECEIVE_CARDS, cards)
    })
  },
  deleteCard: ({ commit }, card) => {
    card = _.cloneDeep(card)
    commit(CARDS_IN_LOADING)
    scope.deleteCard(card, cards => {
      commit(RECEIVE_CARDS, cards)
    })
  },
  getCards: ({ commit, rootState }) => {
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
