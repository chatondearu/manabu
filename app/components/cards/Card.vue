<template>
  <div class="card">
    <bui-resource v-if="item.resourceUrl" :url="item.resourceUrl"></bui-resource>
    <div class="row">
      <p class="first front"
         :class="{'gr-10': mode === 'duo', 'gr-20': mode === 'front' }"
         v-if="mode !== 'back'">
         {{ item.front }}
        <bui-icon-button v-if="showSpell"
                         icon="volume-high" 
          @click.native="spell('front')"></bui-icon-button>
      </p>
      <p class="second back"
         :class="{'gr-10': mode === 'duo', 'gr-20': mode === 'back' }"
         v-if="mode !== 'front'">
         {{ item.back }}
        <bui-icon-button v-if="showSpell"
                         icon="volume-high" 
          @click.native="spell('back')"></bui-icon-button>
      </p>
      <div class="gr-4">
        <bui-icon-button icon="dots-vertical" use-dropdown>
          <bui-menu>
            <bui-menu-item>
              <a @click="showUpdateCard = true">Edit Card</a>
            </bui-menu-item>
            <bui-menu-item>
              <a @click="showRemoveCard = true">Remove Card</a>
            </bui-menu-item>
          </bui-menu>
        </bui-icon-button>
      </div>
    </div>
    <div v-if="showNote && item.note">
      <p class="note">
        <small>
          <bui-icon icon="format-quote"></bui-icon>
          {{ item.note }}
        </small>
      </p>
    </div>

    <bui-dialog v-if="showUpdateCard" :show="showUpdateCard">
      <h1 slot="header">Update Card</h1>
      <template>
        <bui-input name="front" v-model="override.front" placeholder="Front"></bui-input>
        <bui-input name="back" v-model="override.back" placeholder="Back"></bui-input>
        <bui-input name="resource" v-model="override.resourceUrl" placeholder="Resource URL"></bui-input>
        <bui-input name="note" v-model="override.note" placeholder="Add a Note" :multi-line="true" :rows="3"></bui-input>
      </template>
      <template slot="footer">
        <bui-button @click.native="showUpdateCard = false">Close</bui-button>
        <bui-button @click.native="save" type="primary">Save</bui-button>
      </template>
    </bui-dialog>

    <bui-dialog v-if="showRemoveCard" :show="showRemoveCard">
      <h1 slot="header">You want to remove this Card, Are you sure?</h1>
      <template slot="footer">
        <bui-button @click.native="onDelete" type="danger">
          <bui-icon icon="delete"></bui-icon>
          Delete
        </bui-button>
        <bui-button @click.native="showRemoveCard = false">Cancel</bui-button>
      </template>
    </bui-dialog>
  </div>
</template> 

<script>
import { BuiIcon, BuiMenu, BuiMenuItem, BuiResource, BuiIconButton, BuiDialog, BuiButton, BuiInput } from '~/app/components/utils/index'
import { mapActions } from 'vuex'
import { cardModel } from './../../models/models'
import _ from 'lodash'

export default {
  name: 'card',
  props: {
    item: {
      required: true,
      default: cardModel
    },
    mode: String,
    showNote: Boolean,
    showSpell: Boolean,
    frontSpell: String,
    backSpell: String
  },
  watch: {
    showUpdateCard (value, lastValue) {
      if (value !== lastValue && value) {
        this.override = _.merge(this.override, this.item)
      }
    }
  },
  methods: {
    ...mapActions([
      'updateCard',
      'deleteCard'
    ]),
    spell (strId) {
      if (strId === 'front' || strId === 'back') {
        /*global SpeechSynthesisUtterance*/
        var msg = new SpeechSynthesisUtterance()
        // var voices = window.speechSynthesis.getVoices()
        // msg.voice = voices[5] // Note: some voices don't support altering params
        msg.text = this.item[strId]
        msg.lang = strId === 'front' ? this.frontSpell : this.backSpell
        msg.rate = 0.8
        /*global speechSynthesis*/
        speechSynthesis.speak(msg)
      }
    },
    save () {
      this.updateCard(this.override)
      this.showUpdateCard = false
    },
    onDelete () {
      this.deleteCard(this.item)
      this.showRemoveCard = false
    }
  },
  components: {
    BuiMenu,
    BuiMenuItem,
    BuiButton,
    BuiDialog,
    BuiIcon,
    BuiIconButton,
    BuiInput,
    BuiResource
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
@import '~assets/style/variables.scss';

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