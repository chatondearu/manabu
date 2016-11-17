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
      <bui-menu flat>
        <bui-menu-item @click.native="closeNaviagtion">
          <router-link :to="{ name: 'home' }"><bui-icon icon="home"></bui-icon>Home</router-link>
        </bui-menu-item>
        <bui-menu-item @click.native="closeNaviagtion">
          <router-link :to="{ name: 'decks' }"><bui-icon icon="decks"></bui-icon>Decks</router-link>
        </bui-menu-item>
        <bui-menu-item @click.native="closeNaviagtion">
          <router-link :to="{ name: 'notes' }"><bui-icon icon="notes"></bui-icon>Notes</router-link>
        </bui-menu-item>
        <bui-menu-item @click.native="closeNaviagtion">
          <router-link :to="{ name: 'settings' }"><bui-icon icon="settings"></bui-icon>Settings</router-link>
        </bui-menu-item>
        <bui-menu-item @click.native="closeNaviagtion">
          <router-link :to="{ name: 'profile' }"><bui-icon icon="account"></bui-icon>Account</router-link>
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
    console.log(is)
    this.isOffline = !is.online()
    this.isDesktop = is.desktop()

    window.addEventListener('resize', () => {
      this.$nextTick(() => {
        this.screenSize = window.innerWidth
      })
    })
  },
  methods: {
    closeNaviagtion (event) {
      if (!this.showNavigation) { return }
      this.showNavigation = false
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
