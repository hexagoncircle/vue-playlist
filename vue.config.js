module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/global.scss";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-playlist/'
    : '/'
};