module.exports = {
  loading: {
    color: '#FFF',
    failedColor: '#F39',
    height: '1rem',
  },

  head: {
    title: 'metanic',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Metanic' }
    ],
  },

  build: {
    vender: ['isomorphic-fetch'],

    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
