import React from 'react'
import styled from 'styled-components'

import { Route, Redirect, Switch } from 'react-router'

import Layout from 'components/Layout'
import Post from 'components/Post'
import Home from 'components/Home'

export default () => (
  <Layout>
    <Switch>
      <Route path="/home/" component={Home} exact />
      <Route path="/categories/" component={Post} />
      <Route path="/topics/" component={Post} />
      <Redirect to="/home/" />
    </Switch>
  </Layout>
)
