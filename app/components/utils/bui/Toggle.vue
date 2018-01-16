<template>
  <span class="bui-toggle"
        :class="{
          disabled: disabled,
          'bui-toggle-xs': size === 'xs',
          'bui-toggle-md': size === 'md'
        }"
        @click.prevent.stop="toggle">
    <input type="checkbox"
           v-model="checked"
           :id="idElement"
           :checked="checked"
           :disabled="disabled"/>
    <label :for="idElement">
    </label>
  </span>
</template>

<style>
  @mixin fs-toggle-default ($width) {
    $fs-toggle-base-width: $width;
    $fs-toggle-background: $grey-200 !default;
    $fs-toggle-border-color: $grey-300 !default;
    $fs-toggle-circle-background: $white !default;
    $fs-toggle-circle-padding: 2px !default;

    $fs-toggle-active-background: $logmatic-blue !default;
    $fs-toggle-active-border-color: darken($fs-toggle-border-color, 2%) !default;

    $fs-toggle-disable-background: $grey-100 !default;
    $fs-toggle-disable-circle-background: $grey-200 !default;
    $fs-toggle-disable-border-color: darken($fs-toggle-disable-circle-background, 2%) !default;

    padding: 0;
    margin: 0;

    width: $fs-toggle-base-width;
    height: $fs-toggle-base-width/2;

    input[type="checkbox"] {
      position: absolute;
      margin-left: -9999px;
      visibility: hidden;


      & + label {
        position: relative;
        padding: 0;
        margin: 0;

        width: $fs-toggle-base-width;
        height: $fs-toggle-base-width/2;

        //background-color: $white;
        overflow: hidden;
        text-align: left;

        &:hover {
          cursor: pointer;
        }

        //off
        &:before {
          transition: all .3s ease;

          content: 'Off';
          color: $grey-600;
          font-size: $fs-toggle-base-width/4;
          line-height: $fs-toggle-base-width/2 - 1px;
          padding-left: $fs-toggle-base-width/2;

          position: absolute;
          top: 0;
          left: 0;
          display: inline-block;

          width: $fs-toggle-base-width;
          height: $fs-toggle-base-width/2;

          border-radius: $fs-toggle-base-width + 1px;
          border: 1px solid $fs-toggle-active-border-color;
          background-color: $fs-toggle-background;
        }
        &:after {
          transition: all .3s ease;
          content: '';
          position: absolute;
          top: $fs-toggle-circle-padding/2;
          left: $fs-toggle-circle-padding/2;
          display: inline-block;

          width: ($fs-toggle-base-width/2) - $fs-toggle-circle-padding;
          height: ($fs-toggle-base-width/2) - $fs-toggle-circle-padding;

          border: 1px solid $fs-toggle-active-border-color;
          border-radius: $fs-toggle-base-width;

          background-color: $fs-toggle-circle-background;
        }
      }

      //on
      &:checked + label {
        &:before {
          content: 'On';
          color: $white;
          padding-left: $fs-toggle-base-width/10;
          background-color: $fs-toggle-active-background;
          border-color: $fs-toggle-active-background;
        }
        &:after {
          left: $fs-toggle-base-width/2 - 1 + $fs-toggle-circle-padding/2;
          border-color: $fs-toggle-active-background;
        }
      }
    }


    &.disabled {
      input[type="checkbox"] {
        //off
        &:before,
        &:checked:before{
          background-color: $fs-toggle-disable-background;
          border-color: $fs-toggle-disable-border-color;
          color: $fs-toggle-disable-border-color;
        }
        &:after,
        &:checked:after {
          background-color: $fs-toggle-disable-circle-background;
          border-color: $fs-toggle-disable-border-color;
          color: $fs-toggle-disable-border-color;
        }
      }
    }
  }


  .fs-toggle {
    @include fs-toggle-default(30px);
  }
  .fs-toggle-md {
    @include fs-toggle-default(45px);
  }
</style>

<script type="javascript">
  export default {
    name: 'bui-toggle',
    props: {
      checked: {
        type: Boolean,
        required: true
      },
      disabled: Boolean,
      size: {
        required: false,
        default: 'xs',
        type: String
      },
      'onChange': {
        required: false,
        default: function (value, e) {
          return value;
        },
        type: Function
      }
    },
    methods: {
      toggle: function () {
        this.checked = !this.checked;
        this.onChange(this.checked);
        this.$emit('change');
      }
    },
    data: function () {
      return {
        idElement: genId('fs-toggle')
      };
    }
  }
</script>