<template>
  <div class="bui-toolbar" :class="[ position ]">
    <div class="bui-toolbar-left" v-if="showNavigationIcon || showBrand">
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
    </div>
    <div v-if="title" class="bui-toolbar-center">
      <div class="bui-toolbar-title">
        {{ title }}
      </div>
    </div>
    <div class="bui-toolbar-right">
      <!-- <div class="default"></div> -->
      <slot></slot>
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
      actionsLeft: Boolean,
      position: String
    },
    created () {
      const style = document.getElementsByTagName('body')[0].style
      if (this.position === 'top') {
        style['marginTop'] = '56px'
      }
      if (this.position === 'bottom') {
        style['marginBottom'] = '56px'
      }
    },
    components: {
      BuiIconButton
    }
  }
</script>

<style lang="scss" scoped>
  // todo change all flex css by mixin or function scss
  @import '~style/variables.scss';

  .bui-toolbar {
    display: flex;
    height: 56px;
    align-items: center;
    font-size: 18px;
    position: relative;
    width: 100%;
    z-index: 1;

    background-color: $white;

    .bui-toolbar-center {
      display: flex;
      flex-grow: 1;

      .bui-toolbar-title {
        flex-grow: 0;
      }
    }

    .bui-toolbar-left {
      display: flex;
      align-items: center;
      flex-shrink: 0;

      .bui-toolbar-icon {
        margin: auto 5px;
      }

      .bui-toolbar-brand {
        flex-grow: 1;
        min-width: 160px;
        border-right: 1px solid $dark;
      }
    }

    .bui-toolbar-right {
      flex-shrink: 0;

      .actions {
        display: flex;
        margin-left: auto;

        &.left {
          margin-left: none;
        }
      }
    }

    @include card(1);

    &.top {
      position: fixed;
      top: 0;
    }
    &.bottom {
      position: fixed;
      bottom: 0;
    }
  }
</style>