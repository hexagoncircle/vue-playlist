<template>
  <div id="app">
    <header class="u-section-margin">
      <h1 class="section-heading">Music Library Search</h1>

      <section class="u-section-margin">
        <label for="playlist-url">Playlist Link:</label>
        <div class="input-group">
          <input id="playlist-url" type="text" v-model="playlist">
          <button class="btn" id="search-playlist" @click="sendApiRequest">Retrieve Playlist</button>
        </div>
      </section>

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
  spotify.setAccessToken('BQDg9DN3Y77ab0nS17DGSfEBrGpXMLL6C7C6KH9Ft6K2KQgfDfFCj8cOiOMtRerq7VWafwgEtjA2GKFenEm6a6DSMw0RsYTHw5Lq_1Ds_MJccceQ-D3wPOnuwDzzAhLfMbKAB-zNLdNeU7iM1RmCcN81j74');

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
        playlist: 'https://open.spotify.com/user/hexagoncircle/playlist/3MaP5Qqu7gXpPkW8Fai0NA?si=H1a_TtnsSEyY3SAH-gJdAA',
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
      getPlaylistId() {
        const str = 'playlist/';
        const id = this.playlist.slice(this.playlist.indexOf(str) + str.length).split(/[?#]/)[0];
        return id;
      },

      sendApiRequest() {
        const id = this.getPlaylistId();

        spotify.getPlaylistTracks(id)
          .then((data) => this.results = data.items.filter(item => item.track.id))
          .then(() => this.loading = false)
          .catch(() => this.error = true);
      },

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
      this.sendApiRequest();
    },
  }
</script>

<style>
</style>
