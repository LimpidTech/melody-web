function setting(name, defaultValue) {
  const envName = `METANIC_${name.toUpperCase()}`
  const envValue = process.env[envName]
  if (!envValue && typeof defaultValue === 'undefined') throw new Error(`${envName} must be set.`)
  return envValue || defaultValue
}

function withSentry(configuration) {
  if (process.env.SENTRY_PRIVATE_KEY || process.env.SENTRY_DSN) {
    configuration.modules = configuration.modules || []
    configuration.modules.push('@nuxtjs/sentry')

    configuration.sentry = {
      public_key: process.env.SENTRY_PUBLIC_KEY,
      private_key: process.env.SENTRY_PRIVATE_KEY,
      project_id: process.env.SENTRY_PROJECT_ID,
      dsn: process.env.SENTRY_DSN,
      config: {},
    }
  }

  return configuration
}

module.exports = withSentry({
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
      { hid: 'description', name: 'description', content: 'Metanic' },
    ],
  },

  build: {
    vender: ['isomorphic-fetch'],

    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        })
      }
    },
  },

  router: {
    middleware: 'hsts',
  },

  env: {
    METANIC_SERVICES_URL: setting('services_url', 'https://metanic.services/'),
  },

  generate: {
    fallback: true,
  },
})
