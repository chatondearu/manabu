<template>
  <div id="app" :class="{'desktop-mode': desktopMode}">
    <bui-toolbar brand="Manabu"
                 :title="$route.meta.title"
                 :show-navigation-icon="!desktopMode"
                 @navigation::clicked="showNavigation = true"
                 ref="toolbar"
                 position="top">
      <div slot="actions">
        <router-view name="head-toolbar"></router-view>
      </div>
    </bui-toolbar>

    <bui-navigation :open="showNavigation || desktopMode"
                    :show-close-button="!desktopMode"
                    :active-click-away="!desktopMode"
                    @close="showNavigation = false">
      <header class="bui-header">
        <div class="nav-logo">
          <img src="~assets/manabu-logo-inline.png">
        </div>
      </header>
      <bui-menu flat @click.native="closeNaviagtion">
        <bui-menu-item icon="home">
          <router-link :to="{ name: 'home' }" exact>Home</router-link>
        </bui-menu-item>
        <bui-menu-item icon="decks">
          <router-link :to="{ name: 'decks' }">Decks</router-link>
        </bui-menu-item>
        <bui-menu-item icon="notes">
          <router-link :to="{ name: 'notes' }">Notes</router-link>
        </bui-menu-item>
        <bui-menu-item icon="settings">
          <router-link :to="{ name: 'settings' }">Settings</router-link>
        </bui-menu-item>
        <bui-menu-item icon="account">
          <router-link :to="{ name: 'profile' }">Account</router-link>
        </bui-menu-item>
      </bui-menu>
      <hr>
      <p v-if="isOffline" class="offline"><bui-icon icon="power"></bui-icon>Offline</p>
      <p v-else class="online"><bui-icon icon="power"></bui-icon>Online</p>
      <p><bui-icon icon="sync"></bui-icon>Synchronysed</p>
    </bui-navigation>

    <router-view class="view"></router-view>
  </div>
</template>

<script>
import is from 'is_js'
import _ from 'lodash'
import { BuiIcon, BuiIconButton, BuiMenu, BuiMenuItem, BuiToolbar, BuiNavigation } from 'app/components/utils'
import store from './vuex/store'

import LoadingPage from 'app/components/LoadingPage'

export default {
  name: 'app',
  components: {
    BuiIconButton,
    BuiToolbar,
    BuiIcon,
    BuiMenu,
    BuiMenuItem,
    BuiNavigation,
    LoadingPage
  },
  store,
  created () {
    // sync all data from API/LocalStorage with the store.
    this.isOffline = !is.online()
    this.updateState()
    window.addEventListener(
      'resize',
      _.debounce(this.updateState, 100)
    )
  },
  methods: {
    closeNaviagtion (event) {
      if (!this.showNavigation) { return }
      this.showNavigation = false
    },
    updateState () {
      this.screenSize = window.innerWidth
      this.isDesktop = is.desktop()
    }
  },
  computed: {
    desktopMode () {
      return this.isDesktop && this.screenSize > 900
    }
  },
  data () {
    return {
      showNavigation: false,
      isOffline: false,
      isDesktop: false,
      screenSize: window.innerWidth
    }
  }
}
</script>

<style lang="scss">
@import '~style/responsive.scss';
@import '~style/variables.scss';
@import '~style/theme.scss';

#app {
  @include fl-container(column);
  height: 100%;

  &.desktop-mode {
    padding-left: 250px;
  }

  .bui-navigation {
    .bui-header {
      background-color: $palette-grey-50;
    }
    .nav-logo img {
      display: block;
      width: auto;
      max-height: 56px;
      margin: auto;
    }

    .offline .bui-icon{
      color: $palette-red;
    }
    .online .bui-icon{
      color: $palette-green;
    }
  }
}

.view {
  @include flex-fit();
}
</style>
