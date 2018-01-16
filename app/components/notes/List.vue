<template>
  <div class="notes">
    <p class="loading text-center" v-if="loading"><bui-loader></bui-loader></p>
    <note v-for="note in notes"></note>
  </div>
</template>

<script type="javascript">
  // import _ from 'lodash'
  import { BuiIcon } from 'utils'
  import Note from './Note'

  export default {
    name: 'list-notes',
    props: {},
    computed: {
      notes () { return this.$store.state.notes.all },
      loading () { return this.$store.state.notes.loading }
    },
    components: {
      BuiIcon,
      Note
    }
  }
</script> 

<style lang="scss" scoped>
  @import '~style/variables.scss';

  .notes {}
</style>