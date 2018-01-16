import _ from 'lodash'
import scope from 'app/api/scope'

import {
  RECEIVE_DECKS,
  DECKS_IN_LOADING,
  RECEIVE_CARDS,
  CARDS_IN_LOADING
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
  [CARDS_IN_LOADING] (state) {
    state.loading = true
  },
  [RECEIVE_DECKS] (state, decks) {
    state.loading = false
    if (decks && _.isArray(decks)) {
      state.all = decks
    }
  },
  [RECEIVE_CARDS] (state, payload) {
    state.loading = false
    let deck = _.find(state.all, {id: payload.deckId})
    deck.cards = payload.cards
  }
}

const actions = {
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
    scope.updateDeck(deck, decks => {
      commit(RECEIVE_DECKS, decks)
    })
  },
  deleteDeck: ({ commit }, deck) => {
    scope.deleteDeck(deck, decks => {
      commit(RECEIVE_DECKS, decks)
    })
  },
  addCard: ({ commit }, payload) => {
    let card = _.cloneDeep(payload.card)
    commit(CARDS_IN_LOADING)
    scope.addCard(card, payload.deckId, cards => {
      commit(RECEIVE_CARDS, {
        deckId: payload.deckId,
        cards: cards
      })
    })
  },
  updateCard: ({ commit }, card) => {
    card = _.cloneDeep(card)
    commit(CARDS_IN_LOADING)
    scope.updateCard(card, cards => {
      commit(RECEIVE_CARDS, {
        deckId: card.deckId,
        cards: cards
      })
    })
  },
  deleteCard: ({ commit }, card) => {
    card = _.cloneDeep(card)
    commit(CARDS_IN_LOADING)
    scope.deleteCard(card, cards => {
      commit(RECEIVE_CARDS, {
        deckId: card.deckId,
        cards: cards
      })
    })
  },
  getCards: ({ commit }, deckId) => {
    commit(CARDS_IN_LOADING)
    scope.getCards(deckId, cards => {
      commit(RECEIVE_CARDS, {
        deckId: deckId,
        cards: cards
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
