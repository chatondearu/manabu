import scope from 'app/api/scope'
import {
  ADD_TAG,
  RECEIVE_TAGS
} from '../mutation-types'

// initial state
const state = {
  all: []
}

// mutations
const mutations = {
  [ADD_TAG] () {},
  [RECEIVE_TAGS] (state, tags) {
    state.all = tags
  }
}

const actions = {
  getAllTags: ({ commit }) => {
    scope.getTags(tags => {
      commit(RECEIVE_TAGS, tags)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
