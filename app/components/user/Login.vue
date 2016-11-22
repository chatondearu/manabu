<template>
  <div class="login">
    <div class="login-content">
      <p>
        <figure class="login-logo">
          <img src="~assets/manabu-logo-inline.png">
        </figure>
      </p>
      <validator name="login">
        <form novalidate @submit.prevent.stop>
          <bui-input name="username"
                     v-model="username"
                     v-validate.username="['required']"
                     placeholder="Username"></bui-input>
          <bui-input type="password"
                     name="password"
                     v-model="password"
                     v-validate.password="['required']"
                     placeholder="Password"></bui-input>
          <p class="text-right">
            <bui-button type="primary"
                        :disabled="$login.invalid"
                        @click.native="send">Submit</bui-button>
          </p>
        </form>
      </validator>
    </div>
  </div>
</template>

<script>
import {
  BuiInput,
  BuiButton
} from 'app/components/utils'
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
