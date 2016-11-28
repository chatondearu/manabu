<template>
  <div class="card-list">
    <bui-toolbar position="bottom">
      <bui-icon-button :icon="'sort-' + ((ordering !== 'id') ? 'alphabetical' : 'numeric')"
                       use-dropdown>
        <bui-menu>
          <bui-menu-item icon="sort-numeric" @click.native="updateCardOrder('id')">
            Sort by Natural order
          </bui-menu-item>
          <bui-menu-item icon="sort-numeric" @click.native="updateCardOrder('order')">
            Sort by Personal order
          </bui-menu-item>
          <bui-menu-item icon="sort-alphabetical" @click.native="updateCardOrder('front')">
            Sort by Front order
          </bui-menu-item>
          <bui-menu-item icon="sort-alphabetical" @click.native="updateCardOrder('back')">
            Sort by Back order
          </bui-menu-item>
        </bui-menu>
      </bui-icon-button>
      <bui-icon-button :icon="isDuo ? 'eye-off' : 'eye'"
                       @click.native="toggleMode"></bui-icon-button>
      <bui-icon-button v-if="!isDuo"
                       :icon="isReverse ? 'flip-to-front' : 'flip-to-back'"
                       :title="isReverse ? 'flip to front' : 'flip to back'"
                       @click.native="reverseCard"></bui-icon-button>
      <bui-icon-button :icon="'note' + ((showNote) ? '' : '-outline')"
                       @click.native="toggleCardNote"></bui-icon-button>
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

    <div v-if="deck">
      <p class="loading text-center" v-if="loading"><bui-loader></bui-loader></p>
      <transition-group name="list" tag="div">
        <card v-for="card in sort(deck.cards)"
              class="list-item"
              :key="card.id"
              :item="card"
              :duo="isDuo"
              :reverse="isReverse"
              :show-note="showNote"
              :show-spell="deck && deck.useSpell"
              :front-spell="deck && deck.frontSpell"
              :back-spell="deck && deck.backSpell"
              @card::remove="removeCard(card.id)"></card>
      </transition-group>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
  import _ from 'lodash'
  import {
    BuiLoader,
    BuiIconButton,
    BuiMenu,
    BuiMenuItem,
    BuiToolbar,
    BuiInput
  } from 'components/utils'
  import Card from './Card'
  import RemoveCard from './RemoveCard'
  import { mapActions } from 'vuex'

  export default {
    name: 'list-card',
    computed: {
      ordering () { return this.$store.state.user.prefs.cards.ordering },
      showNote () { return this.$store.state.user.prefs.cards.showNote },
      isDuo () { return this.$store.state.user.prefs.cards.duo },
      isReverse () { return this.$store.state.user.prefs.cards.reverse },
      loading () { return this.$store.state.decks.loading },
      deck () {
        return this.deckId != null ? _.find(this.$store.state.decks.all, {id: this.deckId}) : {}
      }
    },
    components: {
      BuiLoader,
      BuiIconButton,
      BuiMenu,
      BuiMenuItem,
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
        'toggleMode',
        'reverseCard'
      ]),
      removeCard (id) {
        this.cardEditedId = id == null ? null : id
        this.showRemoveCard = true
      },
      sort (list) {
        return _.sortBy(_.cloneDeep(list), [this.ordering])
      }
    },
    created () {
      this.getCards(parseInt(this.$route.params.deckId))
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
