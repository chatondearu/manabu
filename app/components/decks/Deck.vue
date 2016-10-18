<template>
  <div class="deck row row-align-middle" @click="$emit('select::deck', item.id)">
    <div class="gr-grow">
      <bui-icon icon="folder"></bui-icon>
    </div>
    <div class="gr-grow">
      <p class="title">{{ item.title }}</p>
      <p class="description">{{ item.description }}</p>
      <p class="total">
        <tag v-for="tagId in item.tags" :tag-id="tagId"></tag>
        {{ item.cardsLength }} cards
      </p>
    </div>
  </div>
</template>

<script>
import { BuiIcon } from '~/app/components/utils/index'
import Tag from './tags/Tag'

export default {
  name: 'deck',
  props: {
    item: {
      required: true,
      default () {
        return {
          id: null,
          title: '',
          description: '',
          tags: [],
          cardsLength: 0,
          groupId: null
        }
      }
    }
  },
  methods: {
    show (id) {}
  },
  components: {
    BuiIcon,
    Tag
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/style/variables.scss';

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