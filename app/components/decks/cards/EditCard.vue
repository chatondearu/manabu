<template>
  <bui-frame>
    <bui-toolbar :title="isNew ? 'Add Card' : 'Update Card'"
                 show-back-icon
                 @back::clicked="$router.back()">
      <div slot="actions">
      </div>
    </bui-toolbar>
    <div class="edit-card">
        <h1 slot="header"></h1>
        <bui-input type="textarea" name="front" v-model="override.front" label="Front"></bui-input>
        <bui-input type="textarea" name="back" v-model="override.back" label="Back"></bui-input>
        <bui-input name="resource" v-model="override.resourceUrl" label="Resource URL" placeholder="eg. http://domaine.tls/my-resource.png"></bui-input>
        <bui-input type="textarea" rows="4" name="note" v-model="override.note" label="Add a Note" :multi-line="true" :rows="3"></bui-input>
        <div>
          <bui-button @click.native="cancel">Cancel</bui-button>
          <bui-button @click.native="save" type="primary">Save</bui-button>
        </div>
    </div>
  </bui-frame>
</template> 

<script>
import { BuiIcon, BuiButton, BuiInput, BuiFrame, BuiToolbar } from 'components/utils'
import { mapActions } from 'vuex'
import { cardModel } from 'app/models/models'
import _ from 'lodash'

export default {
  name: 'edit-card',
  computed: {
    override () {
      const decks = this.$store.state.decks.all
      const cards = (_.find(decks, {id: this.deckId}) || {}).cards || []
      return _.cloneDeep(_.find(cards, {id: this.cardId}) || cardModel())
    },
    isNew () {
      return this.cardId == null
    }
  },
  methods: {
    ...mapActions([
      'addCard',
      'updateCard'
    ]),
    save () {
      if (this.isNew) {
        this.addCard({
          deckId: this.deckId,
          card: this.override
        })
      } else {
        this.updateCard(this.override)
      }
      this.$router.back()
    },
    cancel () {
      this.$router.back()
    }
  },
  components: {
    BuiButton,
    BuiIcon,
    BuiInput,
    BuiToolbar,
    BuiFrame
  },
  data () {
    return {
      cardId: this.$route.params.cardId != null ? parseInt(this.$route.params.cardId) : null,
      deckId: this.$route.params.deckId != null ? parseInt(this.$route.params.deckId) : null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~style/variables.scss';

.edit-card {
  padding: 15px;
}
</style>