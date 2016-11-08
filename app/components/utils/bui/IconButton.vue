<template>
  <div class="bui-icon-button">
    <a @click.prevent="onClick"
      :class="{
        'clear': type === 'clear',
        'primary': type === 'primary',
        'show-droped-element': showDropdown,
        'xl': size === 'xl',
        'xs': size === 'xs'
      }"
      v-on-clickaway="closeDropdown">
      <icon :icon="icon"></icon>
    </a>
    <div class="popper" v-if="useDropdown" v-show="showDropdown" ref="dropdown">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Popper from 'popper.js'
  import { mixin as ClickAway } from 'vue-clickaway'
  import Icon from './Icon'

  export default {
    name: 'bui-icon-button',
    props: {
      icon: String,
      type: String,
      useDropdown: Boolean,
      size: String
    },
    mixins: [
      ClickAway
    ],
    components: {
      Icon
    },
    methods: {
      onClick () {
        if (this.useDropdown) {
          if (!this.showDropdown) {
            this.openDropdown()
          } else {
            this.closeDropdown()
          }
        }
      },
      openDropdown () {
        if (this.showDropdown) { return }
        this.$emit('open::dropdown')
        this.showDropdown = true
        this.$popper = new Popper(this.$el, this.$refs.dropdown, {
          placement: 'bottom-end',
          flipBehavior: ['left', 'bottom', 'top'],
          boundariesElement: window
        })
        this.$nextTick(() => {
          this.$popper.update()
        })
      },
      closeDropdown () {
        if (!this.showDropdown) { return }
        this.$emit('close::dropdown')
        this.showDropdown = false
        this.$popper.destroy()
        this.$popper = null
      }
    },
    data () {
      return {
        $popper: null,
        showDropdown: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~style/variables.scss';

  .bui-icon-button {
    display: inline-block;
    a {
      color: $dark;
      background-color: $blue-grey-50;
      outline: none;
      -webkit-tap-highlight-color:transparent;

      position: relative;
      overflow: hidden;

      display: inline-flex;
      align-items: center;
      justify-content: center;

      width: 40px;
      height: 40px;
      border-radius: 50%;
      &.xl {
        width: 52px;
        height: 52px;
      }

      font-size: 1.3rem;

      &:not([disabled]) {
        cursor: pointer;
      }

      &:active, &:focus {
        background: none;
        outline: none;
      }

      transition: background-color ease 0.25s;
      &:hover {
        background-color: darken($blue-grey-50, 10%);
      }

      &.clear {
        background-color: transparent;
        &:hover {
          background-color: $blue-grey-50;
        }
      }

      &.primary {
        background-color: $primary-color;
        color: $white;
        &:hover {
          background-color: darken($primary-color, 10%);
        }
      }
    }
  }
  .popper {
    // position: absolute;
    z-index: 99;
  }
</style>