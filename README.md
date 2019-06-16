# Vue Playlist

This track list can be sorted by title, artist, or album. A user can also enter text to search this list by song title. Authorization of the application is being handled client-side. A [starter playlist](https://open.spotify.com/user/hexagoncircle/playlist/5UuLjMciDTvfc2rCBwHMIT?si=KJbnDgcJRSy1iZjO2c4WnQ) is set to be fetched once the application is authorized by the user.

## Local application credentials

1. You will need to go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/login) and create a client ID.

2. In the root of this project, create a `.env.local` file and add the following credentials:

    ```
    VUE_APP_CLIENT_ID=[your_client_id]
    VUE_APP_REDIRECT_URI=[your_redirect_uri]
    ```

3. You will want to use `https` locally and create a local certifcate to avoid any cross-origin issues when fetching data. Check out [mkcert.dev](https://mkcert.dev) for creating locally-trusted dev certificates.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
