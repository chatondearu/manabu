<template>
  <div id="app" :class="{'desktop-mode': desktopMode}">
    <bui-toolbar brand="Manabu"
                 :title="$route.meta.title"
                 :show-navigation-icon="!desktopMode"
                 :show-back-icon="$route.meta.back"
                 @navigation::clicked="showNavigation = true"
                 @back::clicked="$router.back()"
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
      <!--<hr>-->
      <div class="bui-separator"></div>
      <bui-menu flat>
        <bui-menu-item icon="power" :class="[ isOffline ? 'offline' : 'online' ]">
          {{ isOffline ? 'Offline' : 'Online' }}
        </bui-menu-item>
        <bui-menu-item icon="sync">
          Synchronysed
        </bui-menu-item>
      </bui-menu>
    </bui-navigation>

    <router-view class="view"></router-view>
    <loading-page v-if="loading"></loading-page>
  </div>
</template>

<script type="javascript">
  import is from 'is_js'
  import _ from 'lodash'
  import {
    BuiIcon,
    BuiIconButton,
    BuiMenu,
    BuiMenuItem,
    BuiToolbar,
    BuiNavigation
  } from 'utils'
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
      console.log(this)
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
      loading () { return this.$store.state.storage.loading },
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

      .bui-toolbar.bottom,
      .bui-toolbar.top {
        left: 250px;
      }
      .bui-frame .bui-frame-container {
        max-width: 600px;
        height: auto;
      }
    }

    .bui-navigation {
      .bui-header {
        background-color: $palette-grey-600;
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

  .bui-separator {
    display: block;
    position: relative;
    height: 1px;
    &:before {
      position: absolute;
      top: 0;
      left: 20px;
      right: 20px;
      display: block;
      content: '';
      border-bottom: 1px solid transparentize($dark, .75);
    }
  }

  .view {
    @include flex-fit();
  }
</style>
