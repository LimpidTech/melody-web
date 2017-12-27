import React from 'react'
import styled from 'styled-components'
import {Route, Switch} from 'react-router'

import Layout from 'components/Layout'
import Post from 'components/Post'
import Home from 'components/Home'

export default () => (
  <Switch>
    <Route path="/" component={Home} exact />
    <Route path="/" component={Post} />
  </Switch>
)
