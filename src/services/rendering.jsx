import React from 'react'
import DOM from 'react-dom/server'
import fs from 'fs'
import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'

import store from 'store'

import Application from '../components/application'

export default function render(request: Object) {
  const sheet = new ServerStyleSheet()

  const document = DOM.renderToString(sheet.collectStyles(
    <Provider store={store}>
      <Application />
    </Provider>
  ))

  return `
    <html>
      <head>
        <meta charset=UTF-8>
        <title>melody</title>
        <link href="https://fonts.googleapis.com/css?family=Didact+Gothic" rel="stylesheet" />

        <style>
          body { font-family: 'Didact Gothic', sans-serif; font-size: 1.4em; margin: 0; box-sizing: border-box; }
          * { margin-top: 0; margin-bottom: 0; }
          * ~ * { margin-top: 0.4em; }
        </style>

        ${sheet.getStyleTags()}
      </head>

      <body>
        <section id="root"></section>
        <script src='{{ frontend_url }}index.js'></script>
      </body>
    </html>
  ``
}
