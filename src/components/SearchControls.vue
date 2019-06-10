<template>
  <section class="search-controls">
    <div class="input-wrapper">
      <label for="search">Search by song title:</label>
      <input type="text" :value="query" @input="updateQuery">
    </div>

    <div role="group" aria-labelledby="group-label">
      <p class="group-label">Sort by:</p>
      <div class="input-group">
        <radio-input label="default" name="sort" :value="sort" @change="setSortOption" />
        <radio-input label="title" name="sort" :value="sort" @change="setSortOption" />
        <radio-input label="album" name="sort" :value="sort" @change="setSortOption" />
        <radio-input label="artist" name="sort" :value="sort" @change="setSortOption" />
      </div>
    </div>
  </section>
</template>

<script>
  import RadioInput from './RadioInput'

  export default {
    name: 'SearchHeader',

    components: {
      RadioInput
    },

    props: {
      query: String,
      sort: String
    },

    methods: {
      setSortOption(selected) {
        this.$emit('change', selected);
      },

      updateQuery(event) {
        this.$emit('input', event.target.value);
      }
    },
  }
</script>

<style lang="scss">
</style>
