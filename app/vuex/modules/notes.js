import scope from 'app/api/scope'
import {
  // ADD_NOTE,
  RECEIVE_NOTES,
  SET_CURRENT_NOTE,
  NOTES_IN_LOADING
} from '../mutation-types'

// initial state
const state = {
  all: [],
  currentNoteId: null,
  loading: false
}

// mutations
const mutations = {
  [NOTES_IN_LOADING] (state) {
    state.loading = true
  },
  [RECEIVE_NOTES] (state, notes) {
    state.loading = false
    state.all = notes
  },
  [SET_CURRENT_NOTE] (state, noteId) {
    state.currentNoteId = noteId
  }
}

const actions = {
  setCurrentNote: ({ dispatch, commit, state }, noteId) => {
    if (state.all.length <= 0) {
      dispatch('getAllNotes')
    }
    commit(SET_CURRENT_NOTE, noteId)
  },
  getAllNotes: ({ commit }) => {
    commit(NOTES_IN_LOADING)
    scope.getNotes(notes => {
      commit(RECEIVE_NOTES, notes)
    })
  },
  addNote: ({ commit }, note) => {
    commit(NOTES_IN_LOADING)
    scope.addNote(note, notes => {
      commit(RECEIVE_NOTES, notes)
    })
  },
  updateNote: ({ commit }, note) => {
    // commit(types.NOTES_IN_LOADING)
    scope.updateNote(note, notes => {
      commit(RECEIVE_NOTES, notes)
    })
  },
  deleteNote: ({ commit }, note) => {
    // commit(types.NOTES_IN_LOADING)
    scope.deleteNote(note, notes => {
      commit(RECEIVE_NOTES, notes)
    })
  }
}

export default {
  state,
  mutations,
  actions
}
