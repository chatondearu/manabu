<template>
  <div class="card">
    <resource v-if="item.resourceUrl" :url="item.resourceUrl"></resource>
    <div class="row">
      <p class="first front gr-10">{{ item.front }}
        <ui-icon-button type="flat" 
                color="default" 
                icon="volume_up" 
                @click="spell('front')"></ui-fab>
      </p>
      <p class="second back gr-10">{{ item.back }}
        <ui-icon-button type="flat" 
                color="default" 
                icon="volume_up" 
                @click="spell('back')"></ui-fab>
      </p>
      <div class="gr-4">
        <ui-icon-button type="flat" icon="more_vert" has-dropdown-menu show-menu-icons :menu-options="[
          {
            id: 0,
            icon: 'create',
            text: 'Edit Card'
          },
          {
            id: 1,
            icon: 'delete',
            text: 'Remove Card'
          }
        ]" @menu-option-selected="onSelectOption"></ui-icon-button>
      </div>
    </div>
    <div>
      <p class="note"><small><ui-icon icon="format_quote"></ui-icon>{{ item.note }}</small></p>
    </div>

    <ui-modal :show.sync="showUpdateCard" header="Update Card">
      <ui-textbox name="front" :value.sync="override.front" placeholder="Front"></ui-textbox>
      <ui-textbox name="back" :value.sync="override.back" placeholder="Back"></ui-textbox>
      <ui-textbox name="back" :value.sync="override.resourceUrl" placeholder="Resource URL"></ui-textbox>
      <ui-textbox name="note" :value.sync="override.note" placeholder="Add a Note" :multi-line="true" :rows="3"></ui-textbox>
      <div slot="footer">
        <ui-button @click="showUpdateCard = false">Close</ui-button>
        <ui-button @click="save" color="primary">Save</ui-button>
      </div>
    </ui-modal>

    <ui-modal :show.sync="showRemoveCard" header="You want to remove this Card, Are you sure?">
      <div slot="footer">
        <ui-button @click="delete" color="danger">
          <ui-icon icon="delete"></ui-icon>
          Delete
        </ui-button>
        <ui-button @click="showRemoveCard = false">Cancel</ui-button>
      </div>
    </ui-modal>
  </div>
</template>

<script>
import Resource from '../utils/Resource'
import { UiTextbox, UiIcon, UiIconButton } from 'keen-ui'
import { updateCard, deleteCard } from './../../vuex/actions'
import { cardModel } from './../../models/models'
import _ from 'lodash'

export default {
  vuex: {
    actions: {
      updateCard,
      deleteCard
    }
  },
  props: {
    item: {
      required: true,
      default: cardModel
    }
  },
  watch: {
    showUpdateCard (value, lastValue) {
      if (value !== lastValue && value) {
        this.override = _.merge(this.override, this.item)
      }
    }
  },
  methods: {
    spell (strId) {
      if (strId === 'front' || strId === 'back') {
        /*global SpeechSynthesisUtterance*/
        var msg = new SpeechSynthesisUtterance()
        // var voices = window.speechSynthesis.getVoices()
        // msg.voice = voices[5] // Note: some voices don't support altering params
        msg.text = this.item[strId]
        msg.lang = 'fr-FR'
        /*global speechSynthesis*/
        speechSynthesis.speak(msg)
      }
    },
    onSelectOption (selected) {
      switch (selected.id) {
        case 0:
          // edit
          this.showUpdateCard = true
          break
        case 1:
          // remove
          this.showRemoveCard = true
          break
      }
    },
    save () {
      this.updateCard(this.override)
      this.showUpdateCard = false
    },
    delete () {
      this.deleteCard(this.item)
      this.showRemoveCard = false
    }
  },
  components: {
    UiTextbox,
    UiIcon,
    UiIconButton,
    Resource
  },
  data () {
    return {
      showUpdateCard: false,
      showRemoveCard: false,
      showDetail: false,
      override: {
        id: null,
        front: null,
        back: null,
        resourceUrl: null,
        note: null,
        deckId: null
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/variables.scss';

.card {
  width: auto;
  min-height: 38px;
  padding: 15px;
  margin: 15px;

  background-color: white;
  border-radius: 2px;
  @include card(1);

  .first {
    font-size: 1.5em;
    color: $dark;
    border-right: 1px solid $blue-grey-50;
  }

  .second {
    font-size: 1.2em;
    color: $blue-grey-400;
  }

  .note {
    margin-top: 10px;
    font-size: .8em;
    color: $blue-grey-300;
  }
}  
</style>