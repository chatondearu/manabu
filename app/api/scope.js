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

let _cards = [
  {
    id: 0,
    front: '私はロマン・リエナーです。',
    back: 'je suis Romain Liénard.',
    note: 'lecon 1',
    deckId: 1,
    icon: null,
    resourceUrl: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 1,
    front: 'マリオンは学生じゃありません。',
    back: 'Marion n\'est pas étudiante.',
    note: 'lecon 1',
    deckId: 1,
    icon: null,
    resourceUrl: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 2,
    front: 'マリオンは会社員ですか。',
    back: 'Marion est elle salariée?',
    note: 'lecon 1',
    deckId: 1,
    icon: null,
    resourceUrl: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 3,
    front: '私も会社員です。',
    back: 'je suis aussi salarié.',
    note: 'lecon 1',
    deckId: 1,
    icon: null,
    resourceUrl: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 4,
    front: 'これは辞書です。',
    back: 'ceci est un dictionnaire.',
    note: 'lecon 2',
    deckId: 1,
    icon: null,
    resourceUrl: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 5,
    front: 'これはパソコンの本です。',
    back: 'ceci est un livre sur l\'ordinateur.',
    note: 'lecon 2',
    deckId: 1,
    icon: null,
    resourceUrl: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 6,
    front: 'それは私の傘です。',
    back: 'c\'est mon parapluie.',
    note: 'lecon 2',
    deckId: 1,
    icon: null,
    resourceUrl: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 7,
    front: 'この傘は私のです。',
    back: 'ce parapluie est à moi.',
    note: 'lecon 2',
    deckId: 1,
    icon: null,
    resourceUrl: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 8,
    front: 'それは何の雑誌ですか？　自動車の雑誌です。',
    back: 'ce magazine est sur quel sujet ? c\'est un magazine sur les voitures.',
    note: 'lecon 2',
    deckId: 1,
    icon: null,
    resourceUrl: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 9,
    front: 'あれはだれのかばんですか？　しおりのかばんです。',
    back: 'à qui est ce sac ? c\'est le sac de Shiori.',
    note: 'lecon 2',
    deckId: 1,
    icon: null,
    resourceUrl: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 10,
    front: 'これからお世話になります。',
    back: 'Enchanté | J\'espere pouvoir compter sur votre aide.',
    note: 'lecon 2 expression dans la premiere conversation',
    deckId: 1,
    icon: null,
    resourceUrl: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 11,
    front: 'どうぞよろしくお願いします。',
    back: 'Ravi de vous rencontrer.',
    note: 'lecon 2 expression dans la premiere conversation',
    deckId: 1,
    icon: null,
    resourceUrl: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  }
]

let _decks = [
  {
    id: 0,
    title: 'Japonais/Francais',
    description: 'Vocabulaire',
    cardsLenght: 0,
    frontSpell: 'ja-JP', // TODO add frontSpell in decks
    backSpell: 'fr-FR', // TODO add backSpell in decks
    // cards: _cards,
    tags: [0, 4],
    groupId: 0, // TODO add group in decks
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 1,
    title: 'Japonais/Francais',
    description: 'Quelques phrases clé/utiles.',
    cardsLenght: 20,
    frontSpell: 'ja-JP',
    backSpell: 'fr-FR',
    // cards: _cards,
    tags: [0, 5],
    groupId: 0,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  }
]

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
    setTimeout(() => cb(_.cloneDeep(_decks)), genTimeout())
  },
  addDeck (newDeck, cb) {
    let lastId = _decks.length
    _decks.push({
      id: lastId,
      title: newDeck.title,
      description: newDeck.description,
      cardsLenght: 0,
      // cards: _cards,
      tags: newDeck.tags || [],
      createdAt: 0,
      updatedAt: 0,
      deletedAt: 0
    })
    Vue.http.post('decks', {
      title: newDeck.title,
      description: newDeck.description,
      tags: newDeck.tags || []
    }).then(() => {
      // success
      console.log('request success.')
      setTimeout(() => cb(_.cloneDeep(_decks)), genTimeout())
    }, () => {
      // error
      console.log('an error was occured.')
      setTimeout(() => cb(_.cloneDeep(_decks)), genTimeout())
    })
  },
  updateDeck (overrideDeck, cb) {
    _decks = _.map(_decks, (deck) => {
      if (deck.id === overrideDeck.id) {
        return _.merge(deck, {
          title: overrideDeck.title,
          description: overrideDeck.description,
          tags: overrideDeck.tags || [],
          cardsLenght: overrideDeck.cardsLenght
        })
      }
      return deck
    })
    setTimeout(() => cb(_.cloneDeep(_decks)), genTimeout())
  },
  deleteDeck (deletedDeck, cb) {
    _.remove(_decks, {id: deletedDeck.id})
    setTimeout(() => cb(_.cloneDeep(_decks)), genTimeout())
  },
  addCard (newCard, deckId, cb) {
    let lastId = _cards.length
    _cards.push({
      id: lastId,
      back: newCard.back,
      front: newCard.front,
      note: newCard.note,
      deckId: deckId,
      icon: null,
      createdAt: 0,
      updatedAt: 0,
      deletedAt: 0
    })
    let cards = _.filter(_cards, (card) => {
      return card.deckId === deckId
    })
    setTimeout(() => cb(_.cloneDeep(cards)), genTimeout())
  },
  updateCard (overrideCard, cb) {
    _cards = _.map(_cards, (card) => {
      if (card.id === overrideCard.id) {
        return _.merge(card, {
          back: overrideCard.back,
          front: overrideCard.front,
          note: overrideCard.note
        })
      }
      return card
    })
    let cards = _.filter(_cards, (card) => {
      return card.deckId === overrideCard.deckId
    })
    setTimeout(() => cb(_.cloneDeep(cards)), genTimeout())
  },
  deleteCard (deletedCard, cb) {
    _.remove(_cards, {id: deletedCard.id})
    let cards = _.filter(_cards, (card) => {
      return card.deckId === deletedCard.deckId
    })
    setTimeout(() => cb(_.cloneDeep(cards)), genTimeout())
  },
  getCards (deckId, cb) {
    let cards = _.filter(_cards, (card) => {
      return card.deckId === deckId
    })
    setTimeout(() => cb(_.cloneDeep(cards)), genTimeout())
  },
  getAllCards (cb) {
    setTimeout(() => cb(_.cloneDeep(_cards)), genTimeout())
  }
}
