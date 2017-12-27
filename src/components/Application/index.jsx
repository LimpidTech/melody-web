import React from 'react'
import styled from 'styled-components'

import { Route, Redirect, Switch } from 'react-router'

import Layout from 'components/Layout'
import PostList from 'components/PostList'
import Home from 'components/Home'

export default () => (
  <Layout>
    <Switch>
      <Route path="/home/" component={Home} exact />
      <Route path="/categories/" component={PostList} />
      <Redirect to="/home/" />
    </Switch>
  </Layout>
)
