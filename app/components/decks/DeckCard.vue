<template>
  <div class="deck-card" @click="$emit('select', item.id)">
    <div>
      <bui-icon icon="folder"></bui-icon>
    </div>
    <div>
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
import { BuiIcon } from 'components/utils'
import Tag from './tags/Tag'

export default {
  name: 'deck-card',
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  components: {
    BuiIcon,
    Tag
  }
}
</script>

<style lang="scss" scoped>
@import '~style/responsive.scss';
@import '~style/variables.scss';

.deck-card {
  width: auto;
  min-height: 38px;
  padding: 15px;
  margin: 15px;

  background-color: white;
  border-radius: 2px;
  @include card(4);

  @include fl-container(row);
  align-items: center;

  & > div {
    flex-grow: 1;
  }

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