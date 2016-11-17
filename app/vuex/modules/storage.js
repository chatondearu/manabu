import scope from 'app/api/scope'
import {
  LOADING_ALL,
  APP_OFFLINE,
  APP_ONLINE,
  CHECK_VERSION
} from '../mutation-types'

// initial state
const state = {
  isOnline: null,
  lastUpdate: null,
  loading: false
}

// mutations
const mutations = {
  [LOADING_ALL] (state) {
    state.loading = true
  }
}

const actions = {
  getAll: ({ commit }) => {
    commit(NOTES_IN_LOADING)
    scope.getNotes(notes => {
      commit(RECEIVE_NOTES, notes)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
