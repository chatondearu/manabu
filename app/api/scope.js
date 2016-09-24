import _ from 'lodash'

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
    front: 'toto toto est cool et vient de tata toto est cool et vient de tata',
    back: 'tata',
    note: 'toto est cool et vient de tata',
    deckId: 0,
    icon: null,
    resourceUrl: 'http://localhost:8888/static/img/manabu-logo.be2687f.png',
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 1,
    front: 'titi',
    back: 'john',
    note: 'john n\'aime pas titi',
    deckId: 0,
    icon: null,
    resourceUrl: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 2,
    back: 'toto toto est cool et vient de tata toto est cool et vient de tata',
    front: 'tata',
    note: 'ND',
    deckId: 1,
    icon: null,
    resourceUrl: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 3,
    back: 'titi',
    front: 'john',
    note: 'ND',
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
    description: 'J\'apprends le Japonais.',
    cardsLenght: 2,
    // cards: _cards,
    tags: [0, 1],
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  },
  {
    id: 1,
    title: 'Toto',
    description: 'ND',
    cardsLenght: 2,
    // cards: _cards,
    tags: [0, 2],
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
  }
]

export default {
  login (username, password, cb) {
    setTimeout(() => cb(_user), genTimeout())
  },
  getProfile (cb) {
    setTimeout(() => cb(_user), genTimeout())
  },
  getTags (cb) {
    setTimeout(() => cb(_tags), genTimeout())
  },
  getDecks (cb) {
    setTimeout(() => cb(_decks), genTimeout())
  },
  addCard (newCard, deckId, cb) {
    let lastId = _cards.lenght
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
