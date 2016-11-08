<template>
  <div class="remove-card">
    <bui-dialog v-if="show" :show="show">
      <h1 slot="header">You want to remove this Card, Are you sure?</h1>
      <template slot="footer">
        <bui-button @click.native="save" type="danger">
          <bui-icon icon="delete"></bui-icon>
          Delete
        </bui-button>
        <bui-button @click.native="$emit('close')">Cancel</bui-button>
      </template>
    </bui-dialog>
  </div>
</template> 

<script>
import { BuiIcon, BuiDialog, BuiButton } from 'components/utils'
import { mapActions } from 'vuex'
import { cardModel } from 'app/models/models'
import _ from 'lodash'

export default {
  name: 'edit-card',
  props: {
    show: Boolean,
    cardId: {
      required: false,
      default: null
    }
  },
  computed: {
    override () {
      const cards = this.$store.state.cards.all
      return _.cloneDeep(_.find(cards, {id: this.cardId}) || cardModel())
    }
  },
  methods: {
    ...mapActions([
      'deleteCard'
    ]),
    save () {
      this.deleteCard(this.override)
      this.$emit('close')
    }
  },
  components: {
    BuiButton,
    BuiDialog,
    BuiIcon
  }
}
</script>

<style lang="scss" scoped>
@import '~style/variables.scss';

.remove-card {}
</style>