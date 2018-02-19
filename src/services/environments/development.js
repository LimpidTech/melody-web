import express from 'express'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import ReactRenderingService from './index'
import configuration from '../../../webpack.config'

const DEV_CLIENT_PATH = 'webpack-dev-server/client'

configuration.plugins.push(new webpack.HotModuleReplacementPlugin())
configuration.plugins.push(new webpack.NamedModulesPlugin())

// Prepends code for the websocket client and HMR support
for (const key in configuration.entry) {
  configuration.entry[key].unshift(DEV_CLIENT_PATH)
  configuration.entry[key].unshift('webpack/hot/dev-server')
}

export default class extends ReactRenderingService {
  createServer () {
    const service = express().get('**', this.handleRequest.bind(this))
    return this.setService(service)
  }
}
