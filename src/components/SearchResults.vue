<template>
  <section id="search-results">
    <div class="search-results__header">
      <h2 class="section-heading">{{resultsTotal}}</h2>
      <div class="input-group">
        <radio-input label="list" name="layout" :value="layoutType" checked @change="setLayoutOption" />
        <radio-input label="grid" name="layout" :value="layoutType" @change="setLayoutOption" />
      </div>
    </div>

    <div v-if="results.length" class="tracks" :class="`tracks--${layoutType}`">
      <Track v-for="result in results" :result="result" :key="result.id" />
    </div>
    <p v-else-if="error">Something went wrong while trying to fetch this data. Check the browser console for more information.</p>
    <p v-else>There are no <strong>song titles</strong> that match your current search query.</p>
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
      results: Array,
      total: Number
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
    },

    computed: {
      resultsTotal() {
        return this.results.length > 0 ? `${this.results.length} tracks` : 'No results';
      }
    }
  }
</script>
