<template>
  <div class="decks-list">
    <ui-fab class="float-fab bottom right"
            type="mini" 
            color="primary" 
            icon="add"></ui-fab>
    <deck v-for="deck in decks" :item.sync="deck" @click="navigate(deck.id)"></deck>
  </div>
</template>

<script>
import { UiFab } from 'keen-ui'
import Deck from './Deck'

import { getAllDecks } from './../../vuex/actions'

export default {
  vuex: {
    getters: {
      decks: ({decks}) => decks.all
    },
    actions: {
      getAllDecks
    }
  },
  components: {
    Deck,
    UiFab
  },
  methods: {
    navigate (id) {
      this.$router.go({
        name: 'deck',
        params: {
          deckId: id
        }
      })
    }
  },
  created () {
    this.getAllDecks()
  },
  data () {
    return {
      ordering: '',
      search: null
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
