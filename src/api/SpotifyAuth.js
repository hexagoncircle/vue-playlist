export default {
  login(api) {
    const width = 600;
    const height = 800;
    const top = (window.screen.height - height) / 4;
    const left = (window.screen.width - width) / 2;

    return window.open(
      `https://accounts.spotify.com/authorize?client_id=${api.clientId}&response_type=token&redirect_uri=${api.redirectUri}&scope=${api.scopes}&show_dialog=true`,
      'Authorize - Spotify',
      `width=${width}, height=${height}, top=${top}, left=${left}`
    )
  }
}