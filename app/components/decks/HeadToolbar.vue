<template>
  <div>
    <bui-icon-button icon="dots-vertical" use-dropdown>
      <bui-menu>
        <bui-menu-item>
          <a @click="showUpdateDeck = true">Edit Deck</a>
        </bui-menu-item>
        <bui-menu-item>
          <a @click="showRemoveDeck = true">Remove Deck</a>
        </bui-menu-item>
      </bui-menu>
    </bui-icon-button>

    <bui-dialog v-if="showUpdateDeck" :show="showUpdateDeck">
      <h1 slot="header">Update Deck</h1>
      <template>
        <bui-input name="title" v-model="overrideDeck.title" placeholder="Title"></bui-input>
        <bui-input name="description" v-model="overrideDeck.description" placeholder="Description" :multi-line="true" :rows="2"></bui-input>
        <bui-select name="front_spell" label="frontSpell" v-model="overrideDeck.frontSpell">
          <bui-select-option v-for="code in countryCode" :value="code.id">{{ code.name }}</bui-select-option>
        </bui-select>
        <bui-select name="back_spell" label="backSpell" v-model="overrideDeck.backSpell">
          <bui-select-option v-for="code in countryCode" :value="code.id">{{ code.name }}</bui-select-option>
        </bui-select>
      </template>
      <template slot="footer">
        <bui-button @click.native="showUpdateDeck = false">Close</bui-button>
        <bui-button @click.native="save" type="primary">Save</bui-button>
      </template>
    </bui-dialog>

    <bui-dialog v-if="showRemoveDeck" :show="showRemoveDeck">
      <h1 slot="header">You want to remove this Deck, Are you sure?</h1>
      <template slot="footer">
        <bui-button @click.native="onDelete" type="danger">
          <bui-icon icon="delete"></bui-icon>
          Delete
        </bui-button>
        <bui-button @click.native="showRemoveDeck = false">Cancel</bui-button>
      </template>
    </bui-dialog>
  </div>
</template>

<script>
  import _ from 'lodash'
  import countryCode from '~/app/countryCode'
  import { BuiMenu, BuiMenuItem, BuiIcon, BuiIconButton, BuiButton, BuiDialog, BuiInput, BuiSelect, BuiSelectOption } from '~/app/components/utils/index'

  import { mapActions } from 'vuex'
  import { deckModel } from '~/app/models/models'

  export default {
    name: 'head-toolbar',
    computed: {
      currentDeck () {
        let currentId = this.$store.state.decks.currentDeckId
        return currentId != null ? _.find(this.$store.state.decks.all, {id: currentId}) : null
      }
    },
    watch: {
      showUpdateDeck (value, lastValue) {
        if (value !== lastValue && value) {
          this.overrideDeck = _.merge(this.overrideDeck, this.currentDeck)
        }
      }
    },
    methods: {
      ...mapActions([
        'updateDeck',
        'deleteDeck'
      ]),
      onDelete () {
        this.deleteDeck(this.currentDeck)
        this.showRemoveDeck = false
        this.$router.push('/decks')
      },
      save () {
        this.updateDeck(this.overrideDeck)
        this.showUpdateDeck = false
      }
    },
    components: {
      BuiMenu,
      BuiMenuItem,
      BuiIconButton,
      BuiButton,
      BuiDialog,
      BuiInput,
      BuiIcon,
      BuiSelect,
      BuiSelectOption
    },
    data () {
      return {
        countryCode,
        showUpdateDeck: false,
        showRemoveDeck: false,
        overrideDeck: deckModel()
      }
    }
  }
</script>