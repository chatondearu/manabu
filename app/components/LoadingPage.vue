<template>
  <div class="loading-page">

  </div>
</template>

<style lang="scss" scoped>
  @import '~style/variables.scss';

  .loading-page {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    background-color: $white;
  }
</style>

<script>
  export default {
    data () {
      return {
        msg: 'hello vue'
      }
    }
  }
</script>