<template>
  <div class="decks-list">
    <bui-icon-button class="float-fab bottom right"
                     type="primary"
                     icon="plus"
                     @click.native="showAddDeck = true"></bui-icon-button>
    <bui-dialog :show="showAddDeck">
      <h1 slot="header">
        Add a new Deck
      </h1>
      <template>
        <bui-input name="title" v-model="newDeck.title" placeholder="Title"></bui-input>
        <bui-input name="description" v-model="newDeck.description" placeholder="Description" :multi-line="true" :rows="2"></bui-input>
        <label>
          Use Spelling
          <input type="checkbox" name="use_spell" v-model="newDeck.useSpell">
        </label>
        <div v-if="newDeck.useSpell">
          <bui-select name="front_spell" label="frontSpell" v-model="newDeck.frontSpell">
            <bui-select-option v-for="code in countryCode" :value="code.id">{{ code.name }}</bui-select-option>
          </bui-select>
          <bui-select name="back_spell" label="backSpell" v-model="newDeck.backSpell">
            <bui-select-option v-for="code in countryCode" :value="code.id">{{ code.name }}</bui-select-option>
          </bui-select>
        </div>
      </template>
      <template slot="footer">
        <bui-button @click.native="showAddDeck = false">Close</bui-button>
        <bui-button @click.native="save" type="primary">Save</bui-button>
      </template>
    </bui-dialog>
    
    <p class="loading text-center" v-if="loading"><bui-loader></bui-loader></p>
    <transition-group name="list">
      <deck v-for="deck in decks" :item="deck" :key="deck.id" @select::deck="navigate"></deck>
    </transition-group>
  </div>
</template>

<script>
import _ from 'lodash'
import countryCode from '~/app/countryCode'
import { BuiIconButton, BuiDialog, BuiButton, BuiInput, BuiSelect, BuiSelectOption, BuiLoader } from '~/app/components/utils/index'
import Deck from './Deck'

import { mapActions } from 'vuex'
import { deckModel } from '~/app/models/models'

export default {
  name: 'list-deck',
  computed: {
    decks () { return this.$store.state.decks.all },
    loading () { return this.$store.state.decks.loading }
  },
  components: {
    Deck,
    BuiButton,
    BuiDialog,
    BuiIconButton,
    BuiInput,
    BuiSelect,
    BuiSelectOption,
    BuiLoader
  },
  methods: {
    ...mapActions([
      'getAllDecks',
      'getAllTags',
      'addDeck'
    ]),
    navigate (id) {
      if (_.isNumber(id) && id >= 0) {
        this.$router.push({
          name: 'deck',
          params: {
            deckId: id
          }
        })
      } else {
        console.log('no deck found for id:', id)
      }
    },
    save () {
      this.addDeck(_.cloneDeep(this.newDeck))
      this.newDeck = deckModel()
      this.showAddDeck = false
    }
  },
  created () {
    this.getAllDecks()
    this.getAllTags()
  },
  data () {
    return {
      ordering: '',
      search: null,
      newDeck: deckModel(),
      showAddDeck: false,
      countryCode
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
