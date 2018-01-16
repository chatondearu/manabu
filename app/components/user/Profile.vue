<template>
  <div class="profile">
    
  </div>
</template>

<script type="javascript">
// import { UiProgressCircular } from 'keen-ui'
// import { getCards } from 'app/vuex/actions'

export default {
  computed: {
    user () { return this.$store.state.user.profile }
  },
  components: {},
  created () {
    if (this.user === null) {
      this.$nextTick(() => {
        this.$router.push({ name: 'login' })
      })
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss">
  @import '~style/variables.scss';
  .profile {
    background-color: $white;
  }
</style>
