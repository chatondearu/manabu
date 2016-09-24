<template>
  <div class="home row row-align-around row-align-middle">
    <a href="/decks" class="navigation-box">
      <ui-icon icon="inbox"></ui-icon>
      Decks
    </a>
    <!-- <a href="/decks" class="navigation-box">
      <ui-icon icon="inbox"></ui-icon>
    </a>
    <a href="/decks" class="navigation-box">
      <ui-icon icon="inbox"></ui-icon>
    </a>
    <a href="/decks" class="navigation-box">
      <ui-icon icon="inbox"></ui-icon>
    </a>
    <a href="/decks" class="navigation-box">
      <ui-icon icon="inbox"></ui-icon>
    </a>
    <a href="/decks" class="navigation-box">
      <ui-icon icon="inbox"></ui-icon>
    </a> -->
  </div>
</template>

<script>
import { UiIcon } from 'keen-ui'
import { cardModel } from './../models/models'
// import DecksList from './decks/List'

console.log(cardModel)

export default {
  vuex: {},
  components: {
    UiIcon
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/variables.scss';
$nav-box-size: 165px;

.home {
  .navigation-box {
    display: block;
    width: $nav-box-size;
    height: $nav-box-size;
    background-color: $white;
    border-radius: 5px;
    @include card(3);

    .ui-icon {
      font-size: 4rem;
    }
  }
}

</style>
