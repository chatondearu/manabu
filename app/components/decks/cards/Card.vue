<template>
  <div class="card">
    <div class="fl-row">
      <div class="resource" v-if="item.resourceUrl">
        <bui-resource :url="item.resourceUrl"></bui-resource>
      </div>
      <div class="first front"
           v-if="showFront">
        <p>
          {{ item.front }}
          <bui-icon-button v-if="showSpell"
                           icon="volume-high"
                           @click.native="spell('front')"></bui-icon-button>
        </p>
      </div>
      <div class="second back"
           v-if="showBack">
        <p>
          {{ item.back }}
          <bui-icon-button v-if="showSpell"
                           icon="volume-high"
                           @click.native="spell('back')"></bui-icon-button>
        </p>
      </div>
      <div class="actions">
        <bui-icon-button v-if="!duo"
                         :icon="flipped ? 'flip-to-front' : 'flip-to-back'"
                         :title="flipped ? 'flip to front' : 'flip to back'"
                         @click.native="flipped = !flipped"></bui-icon-button>
        <bui-icon-button icon="dots-vertical" use-dropdown>
          <bui-menu>
            <bui-menu-item>
              <router-link :to="{ name: 'card:editing', params: { deckId: deckId, cardId: item.id } }">Edit Card</router-link>
            </bui-menu-item>
            <bui-menu-item>
              <a @click="$emit('card::remove')">Remove Card</a>
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
  </div>
</template> 

<script>
import { BuiIcon, BuiMenu, BuiMenuItem, BuiResource, BuiIconButton } from 'components/utils'
import { cardModel } from 'app/models/models'

export default {
  name: 'card',
  props: {
    item: {
      required: true,
      default: cardModel
    },
    duo: Boolean,
    reverse: Boolean,
    showNote: Boolean,
    showSpell: Boolean,
    frontSpell: String,
    backSpell: String
  },
  watch: {
    reverse (value) {
      this.flipped = value
    }
  },
  computed: {
    showFront () {
      return this.duo || !this.flipped
    },
    showBack () {
      return this.duo || this.flipped
    }
  },
  methods: {
    spell (strId) {
      if (strId === 'front' || strId === 'back') {
        /* global SpeechSynthesisUtterance */
        var msg = new SpeechSynthesisUtterance()
        // var voices = window.speechSynthesis.getVoices()
        // msg.voice = voices[5] // Note: some voices don't support altering params
        msg.text = this.item[strId]
        msg.lang = strId === 'front' ? this.frontSpell : this.backSpell
        msg.rate = 0.8
        /* global speechSynthesis */
        speechSynthesis.speak(msg)
      }
    }
  },
  components: {
    BuiMenu,
    BuiMenuItem,
    BuiIcon,
    BuiIconButton,
    BuiResource
  },
  data () {
    return {
      deckId: this.$route.params.deckId != null ? parseInt(this.$route.params.deckId) : null,
      flipped: this.reverse || false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~style/responsive.scss';
@import '~style/variables.scss';

.card {
  width: auto;
  margin: 15px;

  background-color: $white;
  border-radius: 2px;
  @include card(1);

  .fl-row {
    @include fl-container(row);
    align-items: center;
    min-height: 54px;
  }

  .first {
    padding: 15px;
    flex-grow: 2;
    flex-basis: 50%;
    font-size: 1.5em;
    color: $dark;
    border-right: 1px solid $blue-grey-50;
  }

  .second {
    padding: 15px;
    flex-grow: 2;
    flex-basis: 50%;
    font-size: 1.2em;
    color: $blue-grey-400;
  }

  .actions {
    /*flex-grow: 1;*/
    display: flex;
    flex-direction: row;
    align-self: stretch;
    align-items: center;
    padding: 5px;
    background-color: $palette-grey-50;
  }

  .note {
    padding: 10px;
    font-size: .8em;
    background-color: $palette-grey-400;
    color: $white;
  }
}  
</style>