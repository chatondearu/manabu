<template>
  <div id="app">
    <div class="navigation-top">
      <bui-toolbar brand="Manabu"
                   :title="$route.meta.title"
                   show-brand
                   show-navigation-icon
                   @navigation::clicked="showNavigation = true"
                   ref="toolbar">
        <div slot="actions">
          <router-view name="head-toolbar"></router-view>
          <!-- <bui-icon-button icon="dots-vertical" type="clear"></bui-icon-button> -->
        </div>
      </bui-toolbar>
    </div>
    <transition name="nav-expand">
      <nav id="navigation" v-if="showNavigation" v-on-clickaway="closeNaviagtion">
        <bui-icon-button icon="close" type="clear" @click.native="closeNaviagtion"></bui-icon-button>
        <bui-menu>
          <bui-menu-item @click.native="closeNaviagtion"><router-link :to="{ path:'/' }" exact>Home</router-link></bui-menu-item>
          <bui-menu-item @click.native="closeNaviagtion"><router-link :to="{ path:'/decks' }">Decks</router-link></bui-menu-item>
          <bui-menu-item @click.native="closeNaviagtion"><router-link :to="{ path:'/settings' }">Settings</router-link></bui-menu-item>
          <bui-menu-item @click.native="closeNaviagtion"><router-link :to="{ path:'/profile' }">Account</router-link></bui-menu-item>
        </bui-menu>
      </nav>
    </transition>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
import { isChildOf } from '~/app/components/utils/functions'
import { mixin as ClickAway } from 'vue-clickaway'
import { BuiIcon, BuiIconButton, BuiMenu, BuiMenuItem, BuiToolbar } from '~/app/components/utils'
import store from './vuex/store'

export default {
  name: 'app',
  mixins: [
    ClickAway
  ],
  components: {
    BuiIconButton,
    BuiToolbar,
    BuiIcon,
    BuiMenu,
    BuiMenuItem
  },
  store,
  methods: {
    closeNaviagtion (event) {
      if (event && isChildOf(event.target, this.$refs.toolbar.$refs.navigationIcon.$el)) { return }
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
@import '~assets/style/variables.scss';
@import '~assets/style/theme.scss';

// @import '~keen-ui/dist/keen-ui.css';
@import '~gridle/sass/gridle/gridle-flex';

@include gridle_setup((
  context : 24,
  gutter-width : 20px,
  // gutter-left : 20px,
  // direction : rtl,
  // dir-attribute : true,
  states-classes : true,
  // classes-prefix : 'gr-'
));

@include gridle_register_state ( mobile , (
    max-width : 480px 
) );
@include gridle_register_state ( tablet , (
    min-width : 481px,
    max-width : 1024px
) ) ;
@include gridle_register_state ( landscape, (
    query : "(orientation : landscape)"
) );

@include gridle_generate_classes ( );

.container {
  max-width : 960px;
  margin : 0 auto;
}

#app {
  padding-top: 56px;
}

.view {
  position: relative;
  width: 100%;
  min-height: 100%;
  overflow: visible;
}

#navigation {
  position: fixed;
  z-index: 999;
  width: 250px;
  background-color: $white;
  top: 0;
  bottom: 0;
  left: 0;
  @include card(3);

  &.nav-expand-enter-active, &.nav-expand-leave-active {
    transition: left .25s ease;
    left: 0;
  }
  &.nav-expand-enter, &.nav-expand-leave-active {
    left: -250px;
  }
}

.navigation-top {
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
