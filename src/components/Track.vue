<template>
  <div class="track">
    <a class="track__url" :href="spotifyUrl" target="_blank" :title="`Listen to '${trackName}' on Spotify`">
      <img :src="artworkUrl" :alt="album" />
      <div class="track__info">
        <h3 class="track__title">{{trackName}}</h3>
        <h4 class="track__artist">
          <strong>Artist:</strong> {{artists}}
        </h4>
        <h4 class="track__album">
          <strong>Album:</strong> {{album}}
        </h4>
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'Track',

    props: {
      result: Object
    },

    computed: {
      album() {
        return this.result.track.album.name;
      },

      artists() {
        return this.result.track.artists.map(artist => artist.name).join(',');
      },

      artworkUrl() {
        return this.result.track.album.images[1].url;
      },

      spotifyUrl() {
        return this.result.track.external_urls.spotify;
      },

      trackName() {
        return this.result.track.name;
      }
    }
  }
</script>

<style lang="scss">
  @import "../styles/components/Track";
</style>
