import scope from 'app/api/scope'
import {
  LOADING_ALL,
  LOADING_ALL_END,
  // APP_OFFLINE,
  // APP_ONLINE,
  // CHECK_VERSION,
  CHANGE_LOADING_MESSAGE,
  RECEIVE_DECKS,
  RECEIVE_TAGS,
  RECEIVE_NOTES
} from '../mutation-types'

// initial state
const state = {
  isOnline: null,
  lastUpdate: null,
  loadingMessage: '',
  loading: true
}

// mutations
const mutations = {
  [LOADING_ALL] (state) {
    state.loading = true
  },
  [LOADING_ALL_END] (state) {
    state.loading = false
  },
  [CHANGE_LOADING_MESSAGE] (state, message) {
    state.loadingMessage = message
  }
}

const actions = {
  getAll: ({ commit }) => {
    commit(LOADING_ALL)
    commit(CHANGE_LOADING_MESSAGE, 'loading of decks ...')
    scope.getDecks(decks => {
      commit(RECEIVE_DECKS, decks)
      commit(CHANGE_LOADING_MESSAGE, 'decks finished.')
      commit(CHANGE_LOADING_MESSAGE, 'loading of tags')

      scope.getTags(tags => {
        commit(RECEIVE_TAGS, tags)
        commit(CHANGE_LOADING_MESSAGE, 'tags finished.')
        commit(CHANGE_LOADING_MESSAGE, 'loading of notes ...')

        commit(LOADING_ALL_END)
        scope.getNotes(notes => {
          commit(RECEIVE_NOTES, notes)
          commit(CHANGE_LOADING_MESSAGE, 'notes finished.')
        })
      })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
