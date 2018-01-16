<template>
  <div class="home row row-align-around row-align-middle">
    <router-link :to="{ name: 'decks' }" class="navigation-box">
      <bui-icon icon="inbox"></bui-icon>
      Decks
    </router-link>
    <router-link :to="{ name: 'notes' }" class="navigation-box">
      <bui-icon icon="note"></bui-icon>
      Notes
    </router-link>
  </div>
</template>

<script type="javascript">
import { BuiIcon } from 'utils'

export default {
  name: 'home',
  components: {
    BuiIcon
  }
}
</script>

<style lang="scss" scoped>
@import '~style/responsive.scss';
@import '~style/variables.scss';
$nav-box-size: 120px;

.home {
  @include fl-container(row);
  justify-content: space-around;
  align-items: center;
  min-height: 300px;

  .navigation-box {
    display: block;
    width: $nav-box-size;
    height: $nav-box-size;
    background-color: $white;
    color: $dark;
    border-radius: 2px;
    @include card(3);

    .bui-icon {
      font-size: 4rem;
    }
  }
}

</style>
