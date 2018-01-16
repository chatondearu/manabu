<template>
  <div class="bui-resource">
    <img v-if="type === 'img'" :src="url">
  </div>
</template>

<script type="javascript">
  import _ from 'lodash'

  export default {
    name: 'bui-resource',
    props: {
      url: {
        required: false,
        type: String,
        default: null
      }
    },
    computed: {
      type () {
        let type = null
        if (this.url) {
          if (
            _.endsWith(this.url, '.png') ||
            _.endsWith(this.url, '.jpg') ||
            _.endsWith(this.url, '.gif')
          ) {
            type = 'img'
          }
        }
        return type
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bui-resource {
    box-sizing: border-box;
    display: flex;
    img {
      max-width: 100%;
      height: auto;
    }
  }
</style>