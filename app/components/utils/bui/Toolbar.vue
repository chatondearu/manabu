<template>
  <div class="bui-toolbar" :class="[ position, night ? 'night' : '' ]">
    <div class="bui-toolbar-left" v-if="showNavigationIcon || showBrand || title">
      <div class="bui-toolbar-icon" v-if="!showNavigationIcon && showBackIcon">
        <bui-icon-button type="clear"
                         icon="arrow-left"
                         @click.native="$emit('back::clicked')"
                         ref="backIcon"></bui-icon-button>
      </div>
      <div class="bui-toolbar-icon" v-if="showNavigationIcon">
        <bui-icon-button class="unclose-navigation"
                         type="clear"
                         icon="menu"
                         @click.native="$emit('navigation::clicked')"
                         ref="navigationIcon"></bui-icon-button>
      </div>
      <div class="bui-toolbar-brand" v-if="showBrand">
        {{ brand }}
      </div>
      <div v-if="title" class="bui-toolbar-title">
        {{ title }}
      </div>
    </div>
    <div class="bui-toolbar-center">
      <slot></slot>
    </div>
    <div class="bui-toolbar-right">
      <!-- <div class="default"></div> -->
      <div class="actions" :class="{ 'left': actionsLeft }">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import BuiIconButton from './IconButton'

  export default {
    props: {
      brand: String,
      showBrand: Boolean,
      title: String,
      showNavigationIcon: Boolean,
      showBackIcon: Boolean,
      actionsLeft: Boolean,
      position: String,
      night: Boolean
    },
    created () {
      const style = document.getElementsByTagName('body')[0].style
      if (this.position === 'top') {
        style['paddingTop'] = '56px'
      }
      if (this.position === 'bottom') {
        style['paddingBottom'] = '56px'
      }
    },
    components: {
      BuiIconButton
    }
  }
</script>

<style lang="scss">
  @import '../style/variables.scss';

  $bui-toolbar-height: 56px;
  $bui-toolbar-font-size: 1rem;

  .bui-toolbar {
    position: relative;
    width: 100%;
    height: $bui-toolbar-height;

    display: flex;
    align-items: center;

    background-color: $white;
    font-size: $bui-toolbar-font-size;

    & > div {
      display: flex;
      align-items: center;
      /*flex-shrink: 0;*/
      margin-left: 5px;
    }

    &.night {
      background-color: $palette-grey-500;
    }

    .bui-toolbar-center {
      flex-grow: 1;
    }

    .bui-toolbar-left {
      .bui-toolbar-icon {
        margin: auto 5px;
      }

      .bui-toolbar-brand {
        flex-grow: 1;
        min-width: 160px;
        border-right: 1px solid $dark;
      }

      .bui-toolbar-title {
        flex-grow: 1;
        margin-left: 10px;
      }
    }

    .bui-toolbar-right {
      flex-grow: 1;
      margin-right: 5px;

      .actions {
        margin-left: auto;

        &.left {
          margin-left: none;
        }
      }
    }

    @include card(1);

    &.top {
      position: fixed;
      z-index: 1;
      top: 0;
    }
    &.bottom {
      position: fixed;
      z-index: 1;
      bottom: 0;
    }

    .bui-icon-button {
      margin-right: 5px;
    }
  }
</style>