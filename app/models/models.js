export const cardModel = () => {
  return {
    id: null,
    back: null,
    front: null,
    note: null,
    resourceUrl: null,
    deckId: null,
    icon: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  }
}

export const deckModel = () => {
  return {
    id: null,
    title: null,
    description: null,
    resourceUrl: null,
    cardsLenght: 0,
    // cards: _cards,
    tags: [],
    useSpell: false,
    frontSpell: null,
    backSpell: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  }
}

export const noteModel = () => {
  return {
    id: null,
    title: null,
    content: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  }
}

