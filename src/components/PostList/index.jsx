import React from 'react'

import Post from 'components/Post'
import Loading from 'components/Loading'

import withState from './state'

const PostList = props => {
  if (props.posts.length === 0)
    return <Loading>loading</Loading>

  return <Post />
}

export default withState(PostList)
