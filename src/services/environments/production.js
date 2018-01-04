import express from 'express'

import render from '../rendering'
import ReactRenderingService from './index'

const STATIC_PATH = process.env.STATIC_PATH || 'dist'

export default class extends ReactRenderingService {
  createServer () {
    const service = express()

    service.use(express.static(STATIC_PATH, {index: false}))
    service.get('/', this.handleRequest.bind(this))

    return this.setService(service)
  }
}
