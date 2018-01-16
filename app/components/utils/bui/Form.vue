<template>
  <form class="bui-form" novalidate @submit.prevent.stop>
    <slot></slot>
  </form>
</template>

<style lang="scss">
  .bui-form {
    padding: 10px;

    .bui-input {
      margin-bottom: 12px;
    }
  }
</style>

<script type="javascript">
  export default {}
</script>