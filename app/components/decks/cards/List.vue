<template>
  <div class="card-list">
    <p class="loading text-center" v-if="loading"><bui-loader></bui-loader></p>

    <bui-toolbar>
      <template slot="actions">
        <bui-icon-button icon="flip-to-back"
                         @click.native="changeMode"></bui-icon-button>
        <bui-icon-button :icon="'sort-' + ((ordering === 'id') ? 'alphabetical' : 'numeric')"
                         @click.native="changeOrder"></bui-icon-button>
        <bui-icon-button :icon="'note' + ((showNote) ? '' : '-outline')"
                         @click.native="toggleCardNote"></bui-icon-button>
      </template>
    </bui-toolbar>

    <bui-icon-button type="primary"
                     icon="plus"
                     size="xl"
                     :fab="['bottom', 'right']"
                     @click.native="$router.push({
                       name: 'card:adding',
                       params: {
                         deckId: $route.params.deckId
                       }
                     })"></bui-icon-button>

    <remove-card :show="showRemoveCard"
                 @close="showRemoveCard = false"
                 :card-id="cardEditedId"></remove-card>

    <transition-group name="list" tag="div">
      <card v-for="card in sort(cards)"
            class="list-item"
            :key="card.id"
            :item="card"
            :mode="cardMode"
            :show-note="showNote"
            :show-spell="currentDeck && currentDeck.useSpell"
            :front-spell="currentDeck && currentDeck.frontSpell"
            :back-spell="currentDeck && currentDeck.backSpell"
            @card::remove="removeCard(card.id)"></card>
    </transition-group>

    <router-view></router-view>
  </div>
</template>

<script>
import _ from 'lodash'
import { BuiLoader, BuiIconButton, BuiToolbar, BuiInput } from 'components/utils'
import Card from './Card'
import RemoveCard from './RemoveCard'
import { mapActions } from 'vuex'

export default {
  name: 'list-card',
  computed: {
    cards () { return this.$store.state.cards.all },
    ordering () { return this.$store.state.prefs.cards.ordering },
    showNote () { return this.$store.state.prefs.cards.showNote },
    cardMode () { return this.$store.state.prefs.cards.mode },
    loading () { return this.$store.state.cards.loading },
    currentDeck () {
      let currentId = this.deckId
      return currentId != null ? _.find(this.$store.state.decks.all, {id: currentId}) : null
    }
  },
  components: {
    BuiLoader,
    BuiIconButton,
    BuiToolbar,
    BuiInput,
    Card,
    RemoveCard
  },
  methods: {
    ...mapActions([
      'getCards',
      'setCurrentDeck',
      'updateCardOrder',
      'toggleCardNote',
      'updateMode'
    ]),
    changeMode () {
      this.updateMode((this.cardMode === 'duo') ? 'front' : (this.cardMode === 'front') ? 'back' : 'duo')
    },
    changeOrder () {
      this.updateCardOrder((this.ordering === 'id') ? 'front' : (this.ordering === 'front') ? 'back' : 'id')
    },
    removeCard (id) {
      this.cardEditedId = id == null ? null : id
      this.showRemoveCard = true
    },
    sort (list) {
      return _.sortBy(_.cloneDeep(list), [this.ordering])
    }
  },
  created () {
    this.setCurrentDeck(this.deckId)
    this.getCards()
  },
  data () {
    return {
      // search: null,
      deckId: parseInt(this.$route.params.deckId),
      showRemoveCard: false,
      cardEditedId: null
    }
  }
}
</script>

<style lang="scss" scoped>
  .card-list {
  }

  .loading {
    margin: 20px auto;
  }

  .list-item {
    // margin-right: 10px;
    transition: all 1s;
  }
  .list-enter-active, .list-leave-active {
    position: absolute;
  }
  .list-enter, .list-leave-active {
    opacity: 0;
    transform: translateY(100px);
  }
</style>
