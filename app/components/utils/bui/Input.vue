<template>
  <div class="bui-input"
       :class="{ 'inline': inline, 'clear': clear }">
    <label v-if="label"
           :for="name"
           class="bui-input-label">
      {{ label }}
    </label>
    <div class="bui-input-content">
      <input v-if="type === 'text'"
             type="text"
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
      <input v-if="type === 'password'"
             type="password"
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
      <textarea v-if="type === 'textarea'"
                :name="name"
                :id="name"
                :rows="rows"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readonly"
                :number="number"
                :maxlength="maxlength"
                :minlength="minlength"
                :autocomplete="autoComplete"
                v-model="currentValue"
                ref="input"></textarea>
    </div>
    <div class="bui-input-help" v-if="help">
      {{ help }}
    </div>
  </div>
</template>

<script type="javascript">
  export default {
    props: {
      value: [String, Number],
      label: {
        type: String,
        default: ''
      },
      help: String,
      clear: Boolean,
      placeholder: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      },
      readonly: Boolean,
      // icon: {
      //   type: String,
      //   default: ''
      // },
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      name: {
        type: String,
        default: ''
      },
      number: Boolean,
      // autosize: {
      //   type: [Boolean, Object],
      //   default: false
      // },
      rows: {
        type: Number,
        default: 2
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      maxlength: Number,
      minlength: Number,
      inline: Boolean
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
  @import '~style/responsive.scss';
  @import '~style/variables.scss';

  .bui-input {
    // font-family: $font-stack;
    @include fl-container(column);

    label {
      width: 100%;
      margin: 0;
      padding: 0;
    }
      
    .bui-input-label {
      font-size: 1rem;
      line-height: 1.2rem;
      margin-bottom: 2px;
      color: $text-default-color;
      transition: color 0.1s ease;
    }
    .bui-input-content {
      display: block;
      position: relative;

      input[type="text"],
      input[type="password"],
      input[type="number"],
      textarea {
        display: block;
        box-sizing: border-box;
        cursor: auto;
        background: rgba($palette-grey-600, 0.1);
        outline: none;
        border: none;
        border-radius: 3px;

        padding: 3px 10px;
        width: 100%;
        color: $text-default-color;
        font-weight: normal;
        font-size: 16px;
        line-height: normal;
      }

      input[type="text"],
      input[type="password"],
      input[type="number"] {
        height: 32px;
      }
      textarea {
        resize: vertical;
        overflow-x: hidden;
        padding: 5px 7px;
      }
    }
    .bui-input-help {
      color: $palette-grey-200;
      font-weight: 300;
      padding-top: 3px;
    }

    &.inline {
      display: inline-flex;
      .bui-input-content {
        input[type="text"],
        input[type="password"],
        input[type="number"],
        textarea {
          display: inline-block;
        }
      }
    }

    &.clear {
      .bui-input-label {
        color: $white;
      }
      .bui-input-content {
        input[type="text"],
        input[type="password"],
        input[type="number"],
        textarea {
          background: rgba($white, 0.1);
          color: $white;
        }
      }
    }
  }
</style>