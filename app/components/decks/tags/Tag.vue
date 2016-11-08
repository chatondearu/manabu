<template>
  <span class="tag badge">
    <bui-icon icon="label"></bui-icon> {{ tag && tag.title || '...' }}
  </span>
</template>

<script>
import _ from 'lodash'
import { BuiIcon } from 'app/components/utils'

export default {
  props: {
    tagId: {
      required: true,
      default: null
    }
  },
  components: {
    BuiIcon
  },
  computed: {
    tag () {
      return _.find(this.tags, {id: this.tagId}) || {}
    },
    tags () { return this.$store.state.tags.all }
  }
}
</script>

<style lang="scss" scoped>
@import '~style/variables.scss';

.tag {
  color: $white;
  background-color: $blue-500;
  line-height: 1.2rem;
  font-size: 1.2rem;
  margin-left: 0.5rem;

  border-radius: 2px;
}  
</style>