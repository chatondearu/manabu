<template>
  <div class="card-list">
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
      <ui-fab class="float-fab bottom right-1"
              type="mini" 
              color="warning" 
              icon="play_arrow"
              @click=""></ui-fab>
      <ui-fab class="float-fab bottom right"
              type="mini" 
              color="primary" 
              icon="add"
              @click="showAddCard = true"></ui-fab>
    </div>
    <ui-modal :show.sync="showAddCard" header="Add a new Card">
      <ui-textbox name="front" :value.sync="newCard.front" placeholder="Front"></ui-textbox>
      <ui-textbox name="back" :value.sync="newCard.back" placeholder="Back"></ui-textbox>
      <ui-textbox name="back" :value.sync="newCard.resourceUrl" placeholder="Resource URL"></ui-textbox>
      <ui-textbox name="note" :value.sync="newCard.note" placeholder="Add a Note" :multi-line="true" :rows="2"></ui-textbox>
      <div slot="footer">
        <ui-button @click="showAddCard = false">Close</ui-button>
        <ui-button @click="save" color="primary">Save</ui-button>
      </div>
    </ui-modal>

    <ui-progress-circular :show="loading"></ui-progress-circular>
    <card v-show="!loading" v-for="card in cards" :item.sync="card"></card>
  </div>
</template>

<script>
import { UiProgressCircular, UiTextbox, UiButton, UiIconButton, UiFab, UiModal } from 'keen-ui'
import Card from './Card'
import _ from 'lodash'

import { getCards, setCurrentDeck, addCard } from './../../vuex/actions'
import { cardModel } from './../../models/models'

export default {
  vuex: {
    getters: {
      cards: ({ cards }) => cards.all,
      loading: ({ cards }) => cards.loading,
      deck: ({decks}) => {
        return decks.currentDeckId != null ? _.find(decks.all, {id: decks.currentDeckId}) : {}
      }
    },
    actions: {
      getCards,
      setCurrentDeck,
      addCard
    }
  },
  components: {
    UiProgressCircular,
    UiTextbox,
    UiButton,
    UiIconButton,
    UiFab,
    UiModal,
    Card
  },
  methods: {
    save () {
      this.addCard(_.cloneDeep(this.newCard))
      this.newCard = cardModel()
      this.showAddCard = false
    }
  },
  created () {
    this.setCurrentDeck(parseInt(this.$route.params.deckId))
    this.getCards()
  },
  data () {
    return {
      ordering: '',
      search: null,
      showAddCard: false,
      newCard: cardModel()
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
