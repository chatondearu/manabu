<script>
  import _ from 'lodash'
  import Icon from './Icon'

  export default {
    name: 'bui-menu-item',
    props: {
      icon: String
    },
    render (createElement) {
      const firstChild = this.$slots.default.length > 0 ? this.$slots.default[0] : null
      const children = []
      const icon = this.icon ? createElement(Icon, {
        props: {
          icon: this.icon
        }
      }) : null

      // if first child was a components and is 'routeur-link'
      const hasRouterLink = firstChild.componentOptions && firstChild.componentOptions.tag === 'router-link'

      if (!hasRouterLink) {
        children.push(createElement('a', append(icon, this.$slots.default)))
      } else {
        // then we don't need to add tha 'a' element around the default slot
        const childrenLinkOpt = this.$slots.default[0].componentOptions
        childrenLinkOpt.children = append(icon, childrenLinkOpt.children)
        children.push(this.$slots.default)
      }

      return createElement('li', {
        class: ['bui-menu-item']
      }, children)
    }
  }

  function append (el, list) {
    if (!el) {
      return list
    }
    return _.concat([el], list)
  }
</script>

<style lang="scss" scoped>
  @import '~style/variables.scss';

  li.bui-menu-item {
    & > a {
      width: auto;
      text-decoration: none;
      color: $dark;
      font-size: 14px;
      font-weight: 400;
      outline: none;

      position: relative;
      display: block;
      height: 40px;
      line-height: 40px;
      padding: 0 15px;

      user-select: none;
      transition: box-shadow .3s ease, background-color .15s ease;

      .bui-icon {
        font-size: 1.2rem;
        margin-right: 10px;
        vertical-align: middle;
      }

      &:hover {
        cursor: pointer;
        background-color: $palette-grey-50;
      }

      &.router-link-active,
      &.active {
        color: $primary-color;
        /* border-left: 3px solid $primary-color; */
        box-shadow: inset 0 0 5px rgba($primary-color, .33);

        &:hover {
          cursor: initial;
          background-color: $white;
        }
      }
    }
  }
</style>