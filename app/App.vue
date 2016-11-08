<template>
  <div id="app">
    <bui-toolbar brand="Manabu"
                 :title="$route.meta.title"
                 show-navigation-icon
                 @navigation::clicked="showNavigation = true"
                 ref="toolbar"
                 position="top">
      <div slot="actions">
        <router-view name="head-toolbar"></router-view>
      </div>
    </bui-toolbar>

    <bui-navigation :open="showNavigation" @close="showNavigation = false">
      <bui-menu>
        <bui-menu-item @click.native="closeNaviagtion"><router-link :to="{ name: 'home' }">Home</router-link></bui-menu-item>
        <bui-menu-item @click.native="closeNaviagtion"><router-link :to="{ name: 'decks' }">Decks</router-link></bui-menu-item>
        <bui-menu-item @click.native="closeNaviagtion"><router-link :to="{ name: 'notes' }">Notes</router-link></bui-menu-item>
        <bui-menu-item @click.native="closeNaviagtion"><router-link :to="{ name: 'settings' }">Settings</router-link></bui-menu-item>
        <bui-menu-item @click.native="closeNaviagtion"><router-link :to="{ name: 'profile' }">Account</router-link></bui-menu-item>
      </bui-menu>
    </bui-navigation>

    <router-view class="view"></router-view>
  </div>
</template>

<script>
import { BuiIcon, BuiIconButton, BuiMenu, BuiMenuItem, BuiToolbar, BuiNavigation } from 'app/components/utils'
import store from './vuex/store'

export default {
  name: 'app',
  components: {
    BuiIconButton,
    BuiToolbar,
    BuiIcon,
    BuiMenu,
    BuiMenuItem,
    BuiNavigation
  },
  store,
  methods: {
    closeNaviagtion (event) {
      // if (event && isChildOf(event.target, this.$refs.toolbar.$refs.navigationIcon.$el)) { return }
      if (!this.showNavigation) { return }
      this.showNavigation = false
    }
  },
  data () {
    return {
      showNavigation: false
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
}

.view {
  @include flex-fit();
}
</style>
