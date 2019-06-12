<template>
  <div id="app">
    <header class="u-section-margin">
      <h1 class="section-heading">Music Library Search</h1>

      <div v-if="!api.token" class="u-section-margin u-vertical-rhythm">
        <p>You will need to allow this app access to your collaborative playlists to get started.</p>
        <button class="btn" @click="authenticateUser">Authenticate app</button>
      </div>

      <div v-else>
        <p>Search and sort tracks in a Spotify playlist. Copy a public playlist link from Spotify and paste it in the field below. Click the 'request' button to get the tracks from your playlist.</p>
        <section class="u-section-margin u-vertical-rhythm playlist-link-controls">
          <label for="playlist-url">Playlist Link: <a :href="playlistLink">{{playlistName}}</a></label>
          <div class="input-group">
            <input id="playlist-url" type="text" v-model="playlistLink">
            <button class="btn" id="search-playlist" @click="sendApiRequest">Request</button>
          </div>
        </section>
      </div>

      <search-controls v-if="api.token"
        :sort="sort"
        :query="query"
        @change="selectSortOption"
        @input="updateQuery"
      />
    </header>

    <main v-if="api.token" class="u-section-margin">
      <h2 v-if="loading" class="loader-heading">Loading results...</h2>
      <SearchResults v-else :results="filteredResults" :error="error" />
    </main>
  </div>
</template>

<script>
  import SearchControls from './components/SearchControls'
  import SearchResults from './components/SearchResults'

  export default {
    name: 'app',

    components: {
      SearchControls,
      SearchResults
    },

    data() {
      return {
        api: {
          clientId: process.env.VUE_APP_CLIENT_ID,
          redirectUri: process.env.VUE_APP_REDIRECT_URI,
          scopes: 'playlist-read-collaborative',
          token: ''
        },
        error: false,
        loading: true,
        playlistLink: 'https://open.spotify.com/user/hexagoncircle/playlist/5UuLjMciDTvfc2rCBwHMIT?si=GdX9SO3dRKeNThIpZBDE9A',
        playlistName: '',
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
      authenticateUser() {
        let popup = window.open(`https://accounts.spotify.com/authorize?client_id=${this.api.clientId}&response_type=token&redirect_uri=${this.api.redirectUri}&scope=${this.api.scopes}&show_dialog=true`, 'Login with Spotify', 'width=800,height=600')

        window.spotifyCallback = (payload) => {
          this.api.token = payload;
          this.sendApiRequest();
          popup.close();
        }
      },

      getPlaylistId() {
        const str = 'playlist/';
        const id = this.playlistLink.slice(this.playlistLink.indexOf(str) + str.length).split(/[?#]/)[0];
        return id;
      },

      sendApiRequest() {
        const id = this.getPlaylistId();
        const url = `https://api.spotify.com/v1/playlists/${id}`;

        fetch(url, {
          headers: { 'Authorization': `Bearer ${this.api.token}` }
        })
        .then(response => response.json())
        .then((data) => {
          this.playlistName = data.name;
          this.results = data.tracks.items.filter(item => item.track.id);
        })
        .finally(() => this.loading = false)
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
      this.api.token = window.location.hash.substr(1).split('&')[0].split("=")[1];
      if (this.api.token) window.opener.spotifyCallback(this.api.token);
    },
  }
</script>

<style>
</style>
