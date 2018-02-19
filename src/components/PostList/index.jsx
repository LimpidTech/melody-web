import React from 'react'

import Post from 'components/Post'

import withState from './state'

export default withState(props => {
  return (
    <section>
      {props.posts.map(post => <Post key={post.url} {...post} />)}
    </section>
  )
})
