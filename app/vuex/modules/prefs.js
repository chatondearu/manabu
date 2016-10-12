import {
  SHOW_NAVIGATION,
  HIDE_NAVIGATION,
  ORDER_CARD_BY_ID,
  ORDER_CARD_BY_FRONT,
  ORDER_CARD_BY_BACK,
  SHOW_CARD_NOTE,
  HIDE_CARD_NOTE,
  CARD_MODE_DUO,
  CARD_MODE_FRONT,
  CARD_MODE_BACK
} from '../mutation-types'

// initial state
const state = {
  showNavigation: false,
  cards: {
    ordering: 'id',
    showNote: true,
    mode: 'duo'
  }
}

// mutations
const mutations = {
  [SHOW_NAVIGATION] (state) {
    state.showNavigation = true
  },
  [HIDE_NAVIGATION] (state) {
    state.showNavigation = false
  },
  [ORDER_CARD_BY_ID] () {
    state.cards.ordering = 'id'
  },
  [ORDER_CARD_BY_FRONT] () {
    state.cards.ordering = 'front'
  },
  [ORDER_CARD_BY_BACK] () {
    state.cards.ordering = 'back'
  },
  [SHOW_CARD_NOTE] () {
    state.cards.showNote = true
  },
  [HIDE_CARD_NOTE] () {
    state.cards.showNote = false
  },
  [CARD_MODE_DUO] () {
    state.cards.mode = 'duo'
  },
  [CARD_MODE_FRONT] () {
    state.cards.mode = 'front'
  },
  [CARD_MODE_BACK] () {
    state.cards.mode = 'back'
  }
}

const actions = {
  updateCardOrder ({ commit }, order) {
    if (order === 'front') {
      commit('ORDER_CARD_BY_FRONT')
    } else if (order === 'back') {
      commit('ORDER_CARD_BY_BACK')
    } else {
      commit('ORDER_CARD_BY_ID')
    }
  },
  toggleCardNote ({ commit, state }) {
    if (state.cards.showNote) {
      commit('HIDE_CARD_NOTE')
    } else {
      commit('SHOW_CARD_NOTE')
    }
  }
}

export default {
  state,
  mutations,
  actions
}
