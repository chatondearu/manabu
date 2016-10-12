<template>
  <div class="bui-input">
    <label :for="name">
      <span class="bui-input-label">{{ label || placeholder }}</span>
      <input :type="type" 
             :name="name"
             :id="name"
             :placeholder="placeholder"
             :disabled="disabled"
             :readonly="readonly"
             :number="number"
             :maxlength="maxlength"
             :minlength="minlength"
             :autocomplete="autoComplete"
             v-model="currentValue"
             ref="input">
    </label>
  </div>
</template>

<script>
  export default {
    props: {
      value: [String, Number],
      label: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      },
      readonly: {
        type: Boolean,
        default: false
      },
      // icon: {
      //   type: String,
      //   default: ''
      // },
      disabled: {
        type: Boolean,
        default: false
      },
      type: {
        type: String,
        default: 'text'
      },
      name: {
        type: String,
        default: ''
      },
      number: {
        type: Boolean,
        default: false
      },
      // autosize: {
      //   type: [Boolean, Object],
      //   default: false
      // },
      // rows: {
      //   type: Number,
      //   default: 2
      // },
      autoComplete: {
        type: String,
        default: 'off'
      },
      maxlength: Number,
      minlength: Number
    },
    watch: {
      'value' (val, oldValue) {
        this.currentValue = val
      },
      'currentValue' (val) {
        this.$emit('input', val)
        this.$emit('change', val)
      }
    },
    data () {
      return {
        currentValue: this.value
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~assets/style/variables.scss';

  .bui-input {
   // font-family: $font-stack;
    display: flex;
    align-items: flex-start;
    margin-bottom: 12px;

    label {
      width: 100%;
      margin: 0;
      padding: 0;
      
      .bui-input-label {
        font-size: 14px;
        line-height: 1;
        margin-bottom: 2px;
        color: $primary-color;
        transition: color 0.1s ease;
      }
    }

    input[type="text"],
    input[type="number"],
    textarea {
        cursor: auto;
        background: none;
        outline: none;
        border: none;

        padding: 0;
        display: block;
        width: 100%;
        border-bottom-width: 1px;
        border-bottom-style: solid;
        border-bottom-color: $primary-color;
        transition: border 0.1s ease;
        color: $primary-color;
        font-weight: normal;
        font-size: 16px;
        // font-family: $font-stack;
    }
    input[type="text"],
    input[type="number"] {
      height: 32px;
    }
    textarea {
      resize: vertical;
      overflow-x: hidden;
      padding-bottom: 8px;
    }
  }
</style>