import DOM from 'react-dom/server'
import React from 'react'

import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'
import { StaticRouter } from 'react-router'

import store from 'store'

import Application from '../components/Application'

export default function render (request: Object, update) {
  const context = {}
  const sheet = new ServerStyleSheet()

  const document = DOM.renderToString(sheet.collectStyles(
    <Provider store={store}>
      <StaticRouter context={context} location={request.url}>
        <Application />
      </StaticRouter>
    </Provider>
  ))

  const response = `
    <html>
      <head>
        <meta charset=UTF-8>
        <title>melody</title>
        <link href="https://fonts.googleapis.com/css?family=Didact+Gothic" rel="stylesheet" />

        <style>
          body { font-family: 'Didact Gothic', sans-serif; font-size: 1.35em; margin: 0; box-sizing: border-box; }
          * { margin-top: 0; margin-bottom: 0; }
          * ~ * { margin-top: 0.4em; }
        </style>

        ${sheet.getStyleTags()}
      </head>

      <body>
        ${document}
        <script src='/index.js'></script>
      </body>
    </html>
  `

  return response
}
