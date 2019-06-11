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
      key: '192.168.0.2+1-key.pem',
      cert: '192.168.0.2+1.pem',
      ca: '192.168.0.2+1.pem',
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-playlist/'
    : '/'
};