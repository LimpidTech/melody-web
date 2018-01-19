import DOM from 'react-dom/server'
import Promise from 'bluebird'
import React from 'react'

import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'
import { StaticRouter } from 'react-router'

import melody from 'clients/melody'
import store from 'store'

import Application from '../components/Application'

function asDocument(document, sheet) {
  const rendered = DOM.renderToString(document)

  return `
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
        ${rendered}
      </body>
    </html>
  `
}

export default function render (request: Object) {
  const context = {}
  const sheet = new ServerStyleSheet()

  const document = sheet.collectStyles((
    <Provider store={store}>
      <StaticRouter context={context} location={request.url}>
        <Application />
      </StaticRouter>
    </Provider>
  ))

  // Okay, seriously - how do I prevent needing to render twice?
  DOM.renderToString(document)

  const renderResponse = (...args) => {
    return asDocument(document, sheet)
  }

  return melody.awaitAllResponses().then(renderResponse, renderResponse)
}
