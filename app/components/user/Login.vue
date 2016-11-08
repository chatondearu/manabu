<template>
  <div class="login">
    <picture>
      <img src="~assets/manabu-logo-inline.png">
    </picture>
    <h1>Login</h1>
    <bui-input name="username"
                v-model="username"
                placeholder="Username"></bui-input>
    <bui-input type="password"
                name="password"
                :value.sync="password"
                placeholder="Password"></bui-input>
    <bui-button type="primary" :disabled="!valid" @click.native="send">Submit</bui-button>
  </div>
</template>

<script>
// import { UiTextbox, UiButton } from 'keen-ui'
import { BuiInput, BuiButton } from 'app/components/utils'
import { mapActions } from 'vuex'

export default {
  components: {
    BuiInput,
    BuiButton
  },
  watch: {
    connected (value) {
      if (value) {
        this.$router.push({ name: 'home' })
      }
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    send () {
      if (
        this.valid
      ) {
        this.login(this.username, this.password)
      }
    }
  },
  computed: {
    valid () {
      return true
    },
    connected () { return this.$store.state.user.profile != null }
  },
  data () {
    return {
      username: null,
      password: null,
      usernameValid: true,
      passwordValid: true,
      usernameDirty: false,
      passwordDirty: false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~style/variables.scss';

.login {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  padding: 20px;

  background-color: $white;
}
</style>
