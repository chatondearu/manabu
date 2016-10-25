import _ from 'lodash'
import Vue from 'vue'

const genTimeout = () => {
  return _.random(0, 500)
}

let _user = {
  id: 0,
  username: 'romain',
  mail: 'romain.lienard.web@gmail.com',
  password: 'lisou5ple',
  createdAt: 0,
  updatedAt: 0,
  deletedAt: 0
}

let _tags = [
  {
    id: 0,
    title: 'japonais',
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 1,
    title: 'hiragana',
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 2,
    title: 'katakana',
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 3,
    title: 'other',
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 4,
    title: 'vocabulaires',
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 5,
    title: 'phrases clé',
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  }
]

function trackAPI (resp) {
  console.log({response: _.omit(resp, ['body', 'data'])})
}

export default {
  login (username, password, cb) {
    setTimeout(() => cb(_.cloneDeep(_user)), genTimeout())
  },
  getProfile (cb) {
    setTimeout(() => cb(_.cloneDeep(_user)), genTimeout())
  },
  getTags (cb) {
    setTimeout(() => cb(_.cloneDeep(_tags)), genTimeout())
  },
  getDecks (cb) {
    Vue.http.get('decks').then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
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
    })
  },
  deleteDeck (deletedDeck, cb) {
    console.log('toto')
    Vue.http.delete('decks/' + deletedDeck.id).then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
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
    })
  },
  deleteCard (deletedCard, cb) {
    Vue.http.delete('decks/' + deletedCard.deckId + '/cards/' + deletedCard.id).then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
    })
  },
  getCards (deckId, cb) {
    Vue.http.get('decks/' + deckId + '/cards').then((resp) => {
      trackAPI(resp)
      cb(resp.data)
    }, (resp) => {
      trackAPI(resp)
    })
  }// ,
  // getAllCards (cb) {
  //   setTimeout(() => cb(_.cloneDeep(_cards)), genTimeout())
  // }
}
