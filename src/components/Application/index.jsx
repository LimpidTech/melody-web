import React from 'react'

import { Route, Redirect, Switch } from 'react-router'

import Authenticator from 'components/Authenticator'
import EventProvider from 'components/EventProvider'
import Home from 'components/Home'
import Layout from 'components/Layout'
import PostList from 'components/PostList'
import eventHandlers from 'eventHandlers'

export default () => (
  <EventProvider eventMap={eventHandlers}>
    <Layout>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/login/' component={Authenticator} />
        <Redirect to='/' />
      </Switch>
    </Layout>
  </EventProvider>
)
