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
  CARD_DUO_MODE,
  CARD_REVERSE_MODE
} from '../mutation-types'

// initial state
const state = {
  profile: null,
  prefs: {
    cards: {
      ordering: 'id',
      showNote: true,
      reverse: false,
      duo: true
    }
  },
  loading: false
}

// mutations
const mutations = {
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
  [ORDER_CARD_BY_ID] (state) {
    state.prefs.cards.ordering = 'id'
  },
  [ORDER_CARD_BY_FRONT] (state) {
    state.prefs.cards.ordering = 'front'
  },
  [ORDER_CARD_BY_BACK] (state) {
    state.prefs.cards.ordering = 'back'
  },
  [SHOW_CARD_NOTE] (state, isShow) {
    state.prefs.cards.showNote = isShow
  },
  [CARD_DUO_MODE] (state, isDuo) {
    state.prefs.cards.duo = isDuo
  },
  [CARD_REVERSE_MODE] (state, isReverse) {
    state.prefs.cards.reverse = isReverse
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
    commit('SHOW_CARD_NOTE', !state.prefs.cards.showNote)
  },
  toggleMode ({ commit, state }) {
    commit('CARD_DUO_MODE', !state.prefs.cards.duo)
  },
  reverseCard ({ commit, state }) {
    commit('CARD_REVERSE_MODE', !state.prefs.cards.reverse)
  }
}

export default {
  state,
  mutations,
  actions
}
