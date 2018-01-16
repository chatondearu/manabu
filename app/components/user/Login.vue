<template>
  <div class="login">
    <div class="login-content">
      <p>
        <figure class="login-logo">
          <img src="~assets/manabu-logo-inline.png">
        </figure>
      </p>
      <validation name="login">
        <form novalidate @submit.prevent.stop>
          <validity field="username" :validators="['required']">
            <bui-input name="username"
                       v-model="username"
                       placeholder="Username"></bui-input>
          </validity>
          <validity field="password" :validators="['required']">
            <bui-input type="password"
                       name="password"
                       v-model="password"
                       placeholder="Password"></bui-input>
          </validity>
          <p class="text-right">
            <!--
                        :disabled="$login.invalid"-->
            <bui-button type="primary"
                        @click.native="send">Submit</bui-button>
          </p>
        </form>
      </validation>
    </div>
  </div>
</template>

<script type="javascript">
import {
  BuiInput,
  BuiButton
} from 'utils'
import { mapActions } from 'vuex'

export default {
  components: {
    BuiInput,
    BuiButton
  },
  watch: {
    'connected' (value) {
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
        this.$validation.login.valid
      ) {
        this.login(this.username, this.password)
      }
    }
  },
  computed: {
    connected () { return this.$store.state.user.profile != null }
  },
  data () {
    return {
      username: null,
      password: null
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

  background-color: $palette-grey-700;

  .login-content {
    max-width: 400px;
    .login-logo {
      margin: auto;
      text-align: center;
    }
  }
}
</style>
