import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import store from 'store'
import Application from 'components/Application'

ReactDOM.render((
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <Application />
      </BrowserRouter>
    </CookiesProvider>
  </Provider>
), document.body.children[0])

if (module.hot) module.hot.accept()
