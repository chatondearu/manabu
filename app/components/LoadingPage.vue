<template>
  <div class="loading-page">
    <svg width="100px"
         height="100px"
         xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 100 100"
         preserveAspectRatio="xMidYMid"
         class="uil-ring-alt">
      <rect x="0"
            y="0"
            width="100"
            height="100"
            fill="none"
            class="bk"></rect>
      <circle cx="50"
              cy="50"
              r="40"
              stroke="rgba(255,255,255,0.3)"
              fill="none"
              stroke-width="10"
              stroke-linecap="round"></circle>
      <circle cx="50"
              cy="50"
              r="40"
              stroke="#23d6a9"
              fill="none"
              stroke-width="6"
              stroke-linecap="round">
        <animate attributeName="stroke-dashoffset"
                 dur="2.5s"
                 repeatCount="indefinite"
                 from="0"
                 to="502"></animate>
        <animate attributeName="stroke-dasharray"
                 dur="2.5s"
                 repeatCount="indefinite"
                 values="175.7 75.30000000000001;1 250;175.7 75.30000000000001"></animate>
      </circle>
    </svg>
    <h1>{{ message }}</h1>
  </div>
</template>

<style lang="scss" scoped>
  @import '~style/variables.scss';

  .loading-page {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    background-color: $palette-grey-600;

    h1 {
      color: $white;
    }
  }
</style>

<script type="javascript">
  import { mapActions } from 'vuex'

  export default {
    computed: {
      message () { return this.$store.state.storage.loadingMessage }
    },
    methods: {
      ...mapActions([
        'getAll'
      ])
    },
    created () {
      this.getAll()
    },
    data () {
      return {}
    }
  }
</script>