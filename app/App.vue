<template>
  <div class="app">
    <div class="navigation-top">
      <ui-toolbar brand="Manabu" 
                  type="colored" 
                  text-color="white" 
                  :title="$route.title"
                  @nav-icon-clicked="showNavigation = true">
        <div slot="actions">
          <ui-icon-button
              type="clear" 
              color="white"
              icon="more_vert" 
              has-dropdown-menu
              :menu-options="menu" 
              dropdown-position="bottom right"
          ></ui-icon-button>
        </div>
      </ui-toolbar>
    </div>
    <nav id="navigation" v-if="showNavigation">
      <ui-icon-button icon="close" @click="showNavigation = false"></ui-icon-button>
      <ui-menu :options="[
        {
          id: 0,
          icon: 'home',
          text: 'Home'
        },
        {
          id: 1,
          icon: 'inbox',
          text: 'Decks'
        },
        {
          id: 3,
          icon: 'account',
          text: 'Account'
        },
        {
          id: 2,
          icon: 'settings',
          text: 'Settings'
        }
      ]" show-icons @option-selected="onSelectNav"></ui-menu>
    </nav>
    <router-view class="view" @click="showNavigation = false"></router-view>
  </div>
</template>

<script>
import {UiIconButton, UiToolbar, UiMenu} from 'keen-ui'
import store from './vuex/store'

export default {
  components: {
    UiIconButton,
    UiToolbar,
    UiMenu
  },
  store,
  methods: {
    onSelectNav (selected) {
      switch (selected.id) {
        case 0:
          this.$router.go({path: '/'})
          break
        case 1:
          this.$router.go({path: '/decks'})
          break
        case 2:
          this.$router.go({path: '/settings'})
          break
        case 3:
          this.$router.go({path: '/profile'})
          break
      }
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
@import './assets/style/variables.scss';
@import './assets/style/theme.scss';

@import '~keen-ui/dist/keen-ui.css';
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

.app {
  padding-top: 56px;
}

.view {
  position: absolute;
  top: 56px;
  bottom: 0;
  width: 100%;
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
}

.navigation-top {
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
