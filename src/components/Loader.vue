<template>
  <div class="loader" aria-busy="true" aria-live="assertive">
    <span class="loader__bar"></span>
    <span class="loader__bar"></span>
    <span class="loader__bar"></span>
    <span class="loader__bar"></span>
    <span class="loader__bar"></span>
    <p class="loader__text">{{title}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Loader',

    props: {
      title: String
    }
  }
</script>

<style lang="scss">
  @import "../styles/components/Loader";
</style>
