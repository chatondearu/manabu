<template>
  <div class="login">
    <picture>
      <img src="../../assets/manabu-logo.png">
    </picture>
    <h1>Login</h1>
    <ui-textbox name="username"
                :value.sync="username"
                placeholder="Username"
                validation-rules="required"
                :valid.sync="usernameValid"
                :dirty.sync="usernameDirty"></ui-textbox>
    <ui-textbox type="password"
                name="password"
                :value.sync="password"
                placeholder="Password"
                validation-rules="required"
                :valid.sync="passwordValid"
                :dirty.sync="passwordDirty"></ui-textbox>
    <ui-button color="primary" :disabled="!valid" @click="send" button-type="button">Submit</ui-button>
  </div>
</template>

<script>
import { UiTextbox, UiButton } from 'keen-ui'
import { login } from './../../vuex/actions'

export default {
  vuex: {
    getters: {
      connected: ({ user }) => user.profile != null
    },
    actions: {
      login
    }
  },
  components: {
    UiTextbox,
    UiButton
  },
  watch: {
    connected (value) {
      if (value) {
        this.$router.go({path: '/'})
      }
    }
  },
  methods: {
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
      return this.usernameValid && this.usernameDirty && this.passwordValid && this.passwordDirty
    }
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
@import '../../assets/style/variables.scss';

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
