import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

const DEV_CLIENT_PATH = 'webpack-dev-server/client'

import ReactRenderingService from './index'
import configuration from '../../../webpack.config'
import render from '../rendering'

configuration.plugins.push(new webpack.HotModuleReplacementPlugin())
configuration.plugins.push(new webpack.NamedModulesPlugin())

// Prepends code for the websocket client and HMR support
for (const key in configuration.entry) {
  configuration.entry[key].unshift(DEV_CLIENT_PATH)
  configuration.entry[key].unshift('webpack/hot/dev-server')
}

function renderToResponse(request: Object, response: Object) {
  response.end(render(request))
}

export default class extends ReactRenderingService {
  createServer() {
    return this.setService(new WebpackDevServer(webpack(configuration), {
      hot: true,
      lazy: false,
      proxy: {
        '/**': {
          secure: false,
          bypass: renderToResponse,
        }
      }
    }))
  }
}
