import Vue from 'vue'
import {
  trackAPI
} from './../utils'

export default {
  getDecks (cb) {
    Vue.http.get('decks').then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
      cb()
    })
  },
  addDeck (newDeck, cb) {
    Vue.http.post('decks', {
      title: newDeck.title,
      description: newDeck.description,
      tags: newDeck.tags || [],
      useSpell: newDeck.useSpell || false,
      frontSpell: newDeck.frontSpell || 'fr-FR',
      backSpell: newDeck.backSpell || 'fr-FR'
    }).then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
      cb()
    })
  },
  updateDeck (overrideDeck, cb) {
    Vue.http.put('decks/' + overrideDeck.id, {
      title: overrideDeck.title,
      description: overrideDeck.description,
      tags: overrideDeck.tags || [],
      useSpell: overrideDeck.useSpell || false,
      frontSpell: overrideDeck.frontSpell || 'fr-FR',
      backSpell: overrideDeck.backSpell || 'fr-FR'
    }).then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
      cb(resp)
    })
  },
  deleteDeck (deletedDeck, cb) {
    Vue.http.delete('decks/' + deletedDeck.id).then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
      cb(resp)
    })
  },
  addCard (newCard, deckId, cb) {
    Vue.http.post('decks/' + deckId + '/cards', {
      front: newCard.front,
      back: newCard.back,
      note: newCard.note || null,
      icon: newCard.icon || null,
      resourceUrl: newCard.resourceUrl || null
    }).then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
      cb(resp)
    })
  },
  updateCard (overrideCard, cb) {
    Vue.http.put('decks/' + overrideCard.deckId + '/cards/' + overrideCard.id, {
      front: overrideCard.front,
      back: overrideCard.back,
      note: overrideCard.note || null,
      icon: overrideCard.icon || null,
      resourceUrl: overrideCard.resourceUrl || null
    }).then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
      cb(resp)
    })
  },
  deleteCard (deletedCard, cb) {
    Vue.http.delete('decks/' + deletedCard.deckId + '/cards/' + deletedCard.id).then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
      cb(resp)
    })
  },
  getCards (deckId, cb) {
    Vue.http.get('decks/' + deckId + '/cards').then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
      cb(resp)
    })
  }
}
