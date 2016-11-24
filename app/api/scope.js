import _ from 'lodash'

import {
  genTimeout
} from './utils'

import notes from './notes'
import decks from './decks'

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
  ...notes,
  ...decks
}
