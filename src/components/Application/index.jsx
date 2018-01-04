import React from 'react'

import { Route, Redirect, Switch } from 'react-router'

import Authenticator from 'components/Authenticator'
import EventProvider from 'components/EventProvider'
import Home from 'components/Home'
import Layout from 'components/Layout'
import PostList from 'components/PostList'
import eventMap from 'eventHandlers'

export default () => (
  <EventProvider eventMap={eventMap}>
    <Layout>
      <Switch>
        <Route path='/home/' component={Home} exact />
        <Route path='/categories/' component={PostList} />
        <Route path='/login/' component={Authenticator} />
        <Redirect to='/home/' />
      </Switch>
    </Layout>
  </EventProvider>
)
