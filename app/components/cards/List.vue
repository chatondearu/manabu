<template>
  <div class="card-list">
    <div class="bottom-actions">
      <bui-toolbar>
        <bui-icon-button icon="flip-to-back"
                         @click.native=""></bui-icon-button>
        <bui-icon-button :icon="'sort-' + ((ordering === 'id') ? 'alphabetical' : 'numeric')" 
                         @click.native="changeOrder"></bui-icon-button>
        <bui-icon-button :icon="'note' + ((showNote) ? '' : '-outline')"
                         @click.native="toggleCardNote"></bui-icon-button>
      </bui-toolbar>
      <bui-icon-button class="float-fab bottom right-1"
        type="primary"      
        icon="play"></bui-icon-button>
      <bui-icon-button class="float-fab bottom right"
        type="primary"
        icon="plus"
        @click.native="showAddCard = true"></bui-icon-button>
    </div>
    <bui-dialog :show="showAddCard">
      <h1 slot="header">Add a new Card</h1>
      <template>
        <bui-input name="front" v-model="newCard.front" placeholder="Front"></bui-input>
        <bui-input name="back" v-model="newCard.back" placeholder="Back"></bui-input>
        <bui-input name="resource" v-model="newCard.resourceUrl" placeholder="Resource URL"></bui-input>
        <bui-input name="note" v-model="newCard.note" placeholder="Add a Note" :multi-line="true" :rows="2"></bui-input>
      </template>
      <template slot="footer">
        <bui-button @click.native="showAddCard = false">Close</bui-button>
        <bui-button @click.native="save" type="primary">Save</bui-button>
      </template>
    </bui-dialog>

    <p class="loading text-center" v-if="loading"><bui-loader></bui-loader></p>
    <transition-group name="list" tag="div" v-show="!loading">
      <card v-for="card in sort(cards)" 
            :key="card.id"
            :item="card"
            :mode="cardMode"
            :show-note="showNote"
            :front-spell="currentDeck && currentDeck.frontSpell"
            :back-spell="currentDeck && currentDeck.backSpell"></card>
    </transition-group>
  </div>
</template>

<script>
import { BuiIconButton, BuiToolbar, BuiDialog, BuiButton, BuiInput, BuiLoader } from '~/app/components/utils/index'
import Card from './Card'
import _ from 'lodash'

import { mapActions } from 'vuex'
import { cardModel } from './../../models/models'

export default {
  name: 'list-card',
  computed: {
    cards () { return this.$store.state.cards.all },
    ordering () { return this.$store.state.prefs.cards.ordering },
    showNote () { return this.$store.state.prefs.cards.showNote },
    loading () { return this.$store.state.cards.loading },
    currentDeck () {
      let currentId = this.$store.state.decks.currentDeckId
      return currentId != null ? _.find(this.$store.state.decks.all, {id: currentId}) : null
    }
  },
  components: {
    BuiButton,
    BuiDialog,
    BuiToolbar,
    BuiIconButton,
    BuiInput,
    BuiLoader,
    Card
  },
  methods: {
    ...mapActions([
      'getCards',
      'setCurrentDeck',
      'addCard',
      'updateCardOrder',
      'toggleCardNote'
    ]),
    save () {
      this.addCard(_.cloneDeep(this.newCard))
      this.newCard = cardModel()
      this.showAddCard = false
    },
    sort (list) {
      return _.sortBy(_.cloneDeep(list), [this.ordering])
    },
    changeOrder () {
      this.updateCardOrder((this.ordering === 'id') ? 'front' : 'id')
    }
  },
  created () {
    this.setCurrentDeck(parseInt(this.$route.params.deckId))
    this.getCards()
  },
  data () {
    return {
      cardMode: 'duo', // duo | front | back
      search: null,
      showAddCard: false,
      newCard: cardModel()
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-list {
    padding-bottom: 68px;
  }

  .loading {
    margin: 20px auto;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(150px);
  }

  .bottom-actions {
    position: fixed;
    z-index: 1;
    width: 100%;
    bottom: 0;
    left: 0;
  }
</style>
