<template>
  <div class="deck">
    <header class="bui-header">
      <div class="card">
        <h1>{{ deck.title }}
          <bui-icon-button icon="dots-vertical" type="clear" use-dropdown>
            <bui-menu>
              <bui-menu-item>
                <a @click="showRemoveDeck = true">Remove Deck</a>
              </bui-menu-item>
            </bui-menu>
          </bui-icon-button>
        </h1>
        <p>{{ deck.description }}</p>
        <p class="total">
          <tag v-for="tagId in deck.tags" :tag-id="tagId"></tag>
          {{ deck.cardsLength }} cards
        </p>
        <router-link :to="{ name: 'deck:editing', params: { deckId: $route.params.deckId } }">
          <bui-button>Edit</bui-button>
        </router-link>
        <bui-button disabled>Stats</bui-button>
      </div>
    </header>

    <bui-dialog v-if="showRemoveDeck" :show="showRemoveDeck">
      <h1 slot="header">You want to remove this Deck, Are you sure?</h1>
      <template slot="footer">
        <bui-button icon="delete" @click.native="onDelete" type="danger">Delete</bui-button>
        <bui-button @click.native="showRemoveDeck = false">Cancel</bui-button>
      </template>
    </bui-dialog>

    <router-view></router-view>
    <router-view name="frame"></router-view>
  </div>
</template>

<script>
  import _ from 'lodash'
  import { mapActions } from 'vuex'
  import { BuiMenu, BuiMenuItem, BuiButton, BuiToolbar, BuiIconButton, BuiDialog } from 'components/utils'
  // import Tag from './tags/Tag'

  export default {
    name: 'deck',
    computed: {
      deck () {
        const decks = this.$store.state.decks.all
        return _.find(decks, {id: this.deckId}) || {}
      }
    },
    methods: {
      ...mapActions([
        'getAllDecks',
        'deleteDeck'
      ]),
      onDelete () {
        this.deleteDeck(this.deck)
        this.showRemoveDeck = false
        this.$router.back()
      }
    },
    created () {
      this.getAllDecks()
    },
    components: {
      BuiDialog,
      BuiMenu,
      BuiMenuItem,
      BuiButton,
      BuiToolbar,
      BuiIconButton
    },
    data () {
      return {
        deckId: parseInt(this.$route.params.deckId),
        showRemoveDeck: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~style/responsive.scss';
  @import '~style/variables.scss';

  .deck {
    .bui-header {
      padding: 15px;
      min-height: 250px;

      /*background-image: url('/static/15351564311_675b38eee2_c.jpg');*/
      /*background-size: cover;*/
      /*background-position: center center;*/

      background-color: $palette-grey-400;

      .card {
        padding: 15px;
        background-color: $white;

        @include card(1);
      }
    }
  }
</style>