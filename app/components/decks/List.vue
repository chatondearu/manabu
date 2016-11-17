<template>
  <div class="decks-list">
    <bui-icon-button type="primary"
                     icon="plus"
                     size="xl"
                     @click.native="$router.push({
                       name: 'deck:adding'
                     })"
                     :fab="['bottom', 'right']"></bui-icon-button>

    <p class="loading text-center" v-if="loading"><bui-loader></bui-loader></p>
    <transition-group name="list">
      <deck-card v-for="deck in decks" 
                 :key="deck.id" 
                 class="list-item"
                 :item="deck" 
                 @select="navigate"></deck-card>
    </transition-group>

    <router-view></router-view>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { BuiIconButton, BuiLoader } from 'components/utils'
  import DeckCard from './DeckCard'
  import { mapActions } from 'vuex'

  export default {
    name: 'list-deck',
    computed: {
      decks () { return this.$store.state.decks.all },
      loading () { return this.$store.state.decks.loading }
    },
    components: {
      DeckCard,
      BuiIconButton,
      BuiLoader
    },
    methods: {
      ...mapActions([
        'getAllDecks',
        'getAllTags'
      ]),
      navigate (id) {
        if (_.isNumber(id) && id >= 0) {
          this.$router.push({
            name: 'cards',
            params: {
              deckId: id
            }
          })
        } else {
          console.log('no deck found for id:', id)
        }
      }
    },
    created () {
      this.getAllDecks()
      this.getAllTags()
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
