<template>
  <div>
    <bui-icon-button icon="flip-to-back"
                     @click.native="changeMode"></bui-icon-button>
    <bui-icon-button :icon="'sort-' + ((ordering === 'id') ? 'alphabetical' : 'numeric')" 
                     @click.native="changeOrder"></bui-icon-button>
    <bui-icon-button :icon="'note' + ((showNote) ? '' : '-outline')"
                     @click.native="toggleCardNote"></bui-icon-button>
  </div>
</template>

<script>
  import { BuiIconButton } from 'components/utils'
  import { mapActions } from 'vuex'

  export default {
    name: 'head-toolbar',
    computed: {
      ordering () { return this.$store.state.prefs.cards.ordering },
      showNote () { return this.$store.state.prefs.cards.showNote },
      cardMode () { return this.$store.state.prefs.cards.mode }
    },
    methods: {
      ...mapActions([
        'updateCardOrder',
        'toggleCardNote',
        'updateMode'
      ]),
      changeMode () {
        this.updateMode((this.cardMode === 'duo') ? 'front' : (this.cardMode === 'front') ? 'back' : 'duo')
      },
      changeOrder () {
        this.updateCardOrder((this.ordering === 'id') ? 'front' : (this.ordering === 'front') ? 'back' : 'id')
      }
    },
    components: {
      BuiIconButton
    }
  }
</script>