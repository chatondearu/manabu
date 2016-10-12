<template>
  <div class="home row row-align-around row-align-middle">
    <router-link :to="{ path:'/decks' }" class="navigation-box">
      <bui-icon icon="inbox"></bui-icon>
      Decks
    </a>
  </div>
</template>

<script>
import { BuiIcon } from '~/app/components/utils/index'

export default {
  name: 'home',
  components: {
    BuiIcon
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

    .bui-icon {
      font-size: 4rem;
    }
  }
}

</style>
