<script>
  export default {
    props: {
      flat: Boolean
    },
    render (createElement) {
      return createElement('div', {
        class: {
          'bui-menu': true,
          'no-flat': !this.flat
        },
        attrs: {
          role: 'menu',
          tabindex: '1'
        }
      }, [
        createElement('ul', {
          class: ['bui-menu-content'],
          nativeOn: {
            click: this.nativeClickHandler
          }
        }, this.$slots.default)
      ])
    }
  }
</script>

<style lang="scss" scoped>
  @import '~style/variables.scss';

  .bui-menu {
    background-color: $white;
    border-radius: 2px;

    &.no-flat {
      @include card(1); 
    }
  }
</style>