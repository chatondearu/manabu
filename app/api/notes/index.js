import Vue from 'vue'
import {
  trackAPI
} from './../utils'

export default {
  getNotes (cb) {
    Vue.http.get('notes').then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
    })
  },
  addNote (newNote, cb) {
    Vue.http.post('notes', {
      title: newNote.title,
      content: newNote.content
    }).then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
    })
  },
  updateNote (overrideNote, cb) {
    Vue.http.put('notes/' + overrideNote.id, {
      title: overrideNote.title,
      content: overrideNote.content
    }).then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
    })
  },
  deleteNote (deletedNote, cb) {
    Vue.http.delete('notes/' + deletedNote.id).then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
    })
  }
}
