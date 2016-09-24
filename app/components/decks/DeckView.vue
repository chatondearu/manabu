<template>
  <div class="decks-list">
    <div class="bottom-actions">
      <ui-toolbar type="default"
                  hide-nav-icon>
        <ui-icon-button
            type="clear"
            icon="compare arrows"
        ></ui-icon-button>
        <ui-icon-button
            type="clear"
            icon="sort_by_alpha"
        ></ui-icon-button>
      </ui-toolbar>
      <ui-fab class="float-fab bottom right"
              type="mini" 
              color="primary" 
              icon="add"
              @click="showAddCard = true"></ui-fab>
    </div>
    <ui-modal :show.sync="showAddCard" header="Add a new Card">
      <ui-textbox name="front" :value.sync="newCard.front" placeholder="Front"></ui-textbox>
      <ui-textbox name="back" :value.sync="newCard.back" placeholder="Back"></ui-textbox>
      <ui-textbox name="note" :value.sync="newCard.note" placeholder="Add a Note" :multi-line="true" :rows="2"></ui-textbox>
      <div slot="footer">
        <ui-button @click="showAddCard = false">Close</ui-button>
        <ui-button @click="save" color="primary">Save</ui-button>
      </div>
    </ui-modal>
    <cards-list></cards-list>
  </div>
</template>

<script>
import { UiTextbox, UiButton, UiIconButton, UiFab, UiModal } from 'keen-ui'
import CardsList from './../cards/List'
import _ from 'lodash'

import { setCurrentDeck, addCard } from './../../vuex/actions'

let makeNewCard = (deckId) => {
  return {
    id: null,
    back: null,
    front: null,
    note: null,
    deckId: null,
    icon: null,
    createdAt: 0,
    updatedAt: 0,
    deletedAt: 0
  }
}

export default {
  vuex: {
    getters: {
      deck: ({decks}) => {
        return decks.currentDeckId != null ? _.find(decks.all, {id: decks.currentDeckId}) : {}
      }
    },
    actions: {
      setCurrentDeck,
      addCard
    }
  },
  components: {
    CardsList,
    UiTextbox,
    UiButton,
    UiIconButton,
    UiFab,
    UiModal
  },
  methods: {
    save () {
      this.addCard(_.cloneDeep(this.newCard))
      this.newCard = makeNewCard()
      this.showAddCard = false
    }
  },
  created () {
    this.setCurrentDeck(parseInt(this.$route.params.deckId))
  },
  data () {
    return {
      showAddCard: false,
      newCard: makeNewCard()
    }
  }
}
</script>

<style lang="scss" scoped>
  .decks-list {
    padding-bottom: 68px;
  }

  .bottom-actions {
    position: fixed;
    z-index: 1;
    width: 100%;
    bottom: 0;
    left: 0;
  }
</style>
