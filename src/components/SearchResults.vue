<template>
  <section id="search-results">
    <div class="search-results__header">
      <h2 class="section-heading">Search Results</h2>
      <div class="input-group">
        <radio-input label="list" name="layout" :value="layoutType" checked @change="setLayoutOption" />
        <radio-input label="grid" name="layout" :value="layoutType" @change="setLayoutOption" />
      </div>
    </div>

    <div v-if="results.length" class="tracks" :class="`tracks--${layoutType}`">
      <Track v-for="result in results" :result="result" :key="result.id" />
    </div>

    <p v-else>There are no results that match your search.</p>
  </section>
</template>

<script>
import RadioInput from './RadioInput'
import Track from './Track'

export default {
  name: 'SearchResults',

  components: {
    RadioInput,
    Track
  },

  props: {
    error: Boolean,
    results: Array
  },

  data() {
    return {
      layoutType: 'list'
    }
  },

  methods: {
    setLayoutOption(selected) {
      this.layoutType = selected;
    },
  }
}
</script>
