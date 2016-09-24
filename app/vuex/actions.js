import scope from '../api/scope'
import * as types from './mutation-types'

export const setCurrentDeck = ({ dispatch }, deckId) => {
  dispatch(types.SET_CURRENT_DECK, deckId)
}

export const login = ({ dispatch }, username, password) => {
  scope.login(username, password, profile => {
    console.log(profile)
    dispatch(types.RECEIVE_PROFILE, profile)
  })
}

export const getAllDecks = ({ dispatch }) => {
  scope.getDecks(decks => {
    dispatch(types.RECEIVE_DECKS, decks)
  })
}

export const addCard = ({ dispatch, state }, card) => {
  dispatch(types.CARDS_IN_LOADING)
  scope.addCard(card, state.decks.currentDeckId, cards => {
    dispatch(types.RECEIVE_CARDS, cards)
  })
}

export const updateCard = ({ dispatch }, card) => {
  // dispatch(types.CARDS_IN_LOADING)
  scope.updateCard(card, cards => {
    dispatch(types.RECEIVE_CARDS, cards)
  })
}

export const deleteCard = ({ dispatch }, card) => {
  // dispatch(types.CARDS_IN_LOADING)
  scope.deleteCard(card, cards => {
    dispatch(types.RECEIVE_CARDS, cards)
  })
}

export const getCards = ({ dispatch, state }) => {
  dispatch(types.CARDS_IN_LOADING)
  scope.getCards(state.decks.currentDeckId, cards => {
    dispatch(types.RECEIVE_CARDS, cards)
  })
}

export const getAllCards = ({ dispatch }) => {
  dispatch(types.CARDS_IN_LOADING)
  scope.getAllCards(cards => {
    dispatch(types.RECEIVE_CARDS, cards)
  })
}
