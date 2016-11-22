import scope from 'app/api/scope'
import {
  RECEIVE_PROFILE,
  USER_IN_LOADING,
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
  profile: null,
  prefs: {
    cards: {
      ordering: 'id',
      showNote: true,
      mode: 'duo'
    }
  },
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
  },
  [SHOW_NAVIGATION] (state) {
    state.prefs.showNavigation = true
  },
  [HIDE_NAVIGATION] (state) {
    state.prefs.showNavigation = false
  },
  [ORDER_CARD_BY_ID] () {
    state.prefs.cards.ordering = 'id'
  },
  [ORDER_CARD_BY_FRONT] () {
    state.prefs.cards.ordering = 'front'
  },
  [ORDER_CARD_BY_BACK] () {
    state.prefs.cards.ordering = 'back'
  },
  [SHOW_CARD_NOTE] () {
    state.prefs.cards.showNote = true
  },
  [HIDE_CARD_NOTE] () {
    state.prefs.cards.showNote = false
  },
  [CARD_MODE_DUO] () {
    state.prefs.cards.mode = 'duo'
  },
  [CARD_MODE_FRONT] () {
    state.prefs.cards.mode = 'front'
  },
  [CARD_MODE_BACK] () {
    state.prefs.cards.mode = 'back'
  }
}

const actions = {
  login: ({ commit }, username, password) => {
    scope.login(username, password, profile => {
      commit(RECEIVE_PROFILE, profile)
    })
  },
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
  },
  updateMode ({ commit }, mode) {
    if (mode === 'back') {
      commit('CARD_MODE_BACK')
    } else if (mode === 'front') {
      commit('CARD_MODE_FRONT')
    } else {
      commit('CARD_MODE_DUO')
    }
  }
}

export default {
  state,
  mutations,
  actions
}
