import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'

import store from 'store'
import Routing from 'components/Routing'

ReactDOM.render((
  <Provider store={store}>
    <CookiesProvider>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </CookiesProvider>
  </Provider>
), document.body.children[0])

if (module.hot) module.hot.accept()
