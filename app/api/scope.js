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
      // success
      console.log('request success.')
      cb(resp.data)
    }, () => {
      // error
      console.log('an error was occured.')
    })
  },
  addDeck (newDeck, cb) {
    Vue.http.post('decks', {
      title: newDeck.title,
      description: newDeck.description,
      tags: newDeck.tags || [],
      frontSpell: newDeck.frontSpell || 'fr-FR',
      backSpell: newDeck.backSpell || 'fr-FR'
    }).then((resp) => {
      // success
      console.log('request success.')
      cb(resp.data)
    }, () => {
      // error
      console.log('an error was occured.')
    })
  },
  updateDeck (overrideDeck, cb) {
    Vue.http.put('decks/' + overrideDeck.id, {
      title: overrideDeck.title,
      description: overrideDeck.description,
      tags: overrideDeck.tags || [],
      frontSpell: overrideDeck.frontSpell || 'fr-FR',
      backSpell: overrideDeck.backSpell || 'fr-FR'
    }).then((resp) => {
      // success
      console.log('request success.')
      cb(resp.data)
    }, () => {
      // error
      console.log('an error was occured.')
    })
  },
  deleteDeck (deletedDeck, cb) {
    console.log('toto')
    Vue.http.delete('decks/' + deletedDeck.id).then((resp) => {
      // success
      console.log('request success.')
      cb(resp.data)
    }, () => {
      // error
      console.log('an error was occured.')
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
      // success
      console.log('request success.')
      cb(resp.data)
    }, () => {
      // error
      console.log('an error was occured.')
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
      // success
      console.log('request success.')
      cb(resp.data)
    }, () => {
      // error
      console.log('an error was occured.')
    })
  },
  deleteCard (deletedCard, cb) {
    Vue.http.delete('decks/' + deletedCard.deckId + '/cards/' + deletedCard.id).then((resp) => {
      // success
      console.log('request success.')
      cb(resp.data)
    }, () => {
      // error
      console.log('an error was occured.')
    })
  },
  getCards (deckId, cb) {
    Vue.http.get('decks/' + deckId + '/cards').then((resp) => {
      // success
      console.log('request success.')
      cb(resp.data)
    }, () => {
      // error
      console.log('an error was occured.')
    })
  }// ,
  // getAllCards (cb) {
  //   setTimeout(() => cb(_.cloneDeep(_cards)), genTimeout())
  // }
}
