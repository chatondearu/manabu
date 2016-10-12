<template>
  <div class="profile">
  </div>
</template>

<script>
// import { UiProgressCircular } from 'keen-ui'
// import { getCards } from './../../vuex/actions'

export default {
  computed: {
    user () { return this.$store.state.user.profile }
  },
  components: {},
  created () {
    if (this.user === null) {
      this.$nextTick(() => {
        this.$router.go({path: '/login'})
      })
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
</style>
