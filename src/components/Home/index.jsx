import React from 'react'

import PostList from 'components/PostList'
import WithCollection from 'components/WithCollection'

export default () => (
  <WithCollection
    collection='recent_posts'
    as='posts'
    using={PostList} />
)
