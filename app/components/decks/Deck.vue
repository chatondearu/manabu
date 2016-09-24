<template>
  <div class="deck row row-align-middle">
    <div class="gr-grow">
      <ui-icon icon="folder"></ui-icon>
    </div>
    <div class="gr-grow">
      <p class="title">{{ item.title }}</p>
      <p class="description">{{ item.description }}</p>
      <p class="total">24 cards</p>
    </div>
  </div>
</template>

<script>
import { UiIcon, UiIconButton } from 'keen-ui'

export default {
  ready () {},
  props: {
    item: {
      required: true,
      default () {
        return {
          id: null,
          title: '',
          description: '',
          groupId: null
        }
      }
    }
  },
  methods: {
    show (id) {}
  },
  components: {
    UiIcon,
    UiIconButton
  }
}
</script>

<style lang="scss" scoped>
@import './../../assets/style/variables.scss';

.deck {
  width: auto;
  min-height: 38px;
  padding: 15px;
  margin: 15px;

  background-color: white;
  border-radius: 2px;
  @include card(4);

  .title {
    font-size: 1.5em;
    color: $dark;
  }

  .description {
    margin-top: 10px;
    font-size: 1em;
    color: $blue-grey-400;
  }

  .total {
    text-align: right;
    margin-top: 10px;
    font-size: 0.8em;
    color: $blue-grey-400;
  }
}  
</style>