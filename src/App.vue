<template>
  <div id="app">
    <header class="u-section-margin">
      <h1 class="section-heading">Music Library Search</h1>

      <search-controls
        :sort="sort"
        :query="query"
        @change="selectSortOption"
        @input="updateQuery"
      />
    </header>

    <main class="u-section-margin">
      <h2 class="loader-heading" v-if="loading">Loading results...</h2>
      <SearchResults v-else :results="filteredResults" :error="error" />
    </main>
  </div>
</template>

<script>
  import SpotifyWebApi from 'spotify-web-api-js';
  import SearchControls from './components/SearchControls'
  import SearchResults from './components/SearchResults'

  const spotify = new SpotifyWebApi();
  spotify.setAccessToken('BQBBAH1PfWkB744V2JAAkrpJ06oMGPUTEq2COwQkrZ5xQ_X10g4l2y6C7VIya83CKZ_NZLuoDwkrsjqy91HkFoBByT-izuZXtMWCfdPry0UuCHzqg85nsTTC7T56VShmjOgxK_yxXB9jLcMn56f6TKLCpMc');

  export default {
    name: 'app',

    components: {
      SearchControls,
      SearchResults
    },

    data() {
      return {
        error: false,
        loading: true,
        query: '',
        results: [],
        sort: 'default'
      }
    },

    computed: {
      filteredResults() {
        const results = this.results.filter(result => {
          return result.track.name.toLowerCase().includes(this.query.toLowerCase());
        })

        if (this.sort === 'title') this.sortByTrackTitle(results);
        else if (this.sort === 'album') this.sortByAlbum(results);
        else if (this.sort === 'artist') this.sortByArtist(results);

        return results;
      }
    },

    methods: {
      selectSortOption(selected) {
        this.sort = selected;
      },

      sortByTrackTitle(results) {
        results.sort((a, b) => {
          const titleA = a.track.name;
          const titleB = b.track.name;
          return (titleA < titleB) ? -1 : (titleA > titleB) ? 1 : 0;
        });
      },

      sortByAlbum(results) {
        results.sort((a, b) => {
          const albumA = a.track.album.name;
          const albumB = b.track.album.name;
          return (albumA < albumB) ? -1 : (albumA > albumB) ? 1 : 0;
        });
      },

      sortByArtist(results) {
        results.sort((a, b) => {
          const artistA = a.track.artists[0].name;
          const artistB = b.track.artists[0].name;
          return (artistA < artistB) ? -1 : (artistA > artistB) ? 1 : 0;
        });
      },

      updateQuery(value) {
        this.query = value;
      }
    },

    mounted() {
      spotify.getPlaylistTracks('0WC8l4atIwb1jAosUagBoA')
        .then((data) => this.results = data.items)
        .then(() => this.loading = false)
        .catch(() => this.error = true);
    },
  }
</script>

<style>
</style>
