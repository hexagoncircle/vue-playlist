module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/global.scss";`
      }
    }
  },
  devServer: {
    https: {
      key: process.env.VUE_APP_LOCAL_KEY,
      cert: process.env.VUE_APP_LOCAL_CERT,
      ca: process.env.VUE_APP_LOCAL_CA,
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-playlist/'
    : '/'
};