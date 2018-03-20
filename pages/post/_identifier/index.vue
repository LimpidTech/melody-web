<template>
  <Post
    :url="post.url"
    :subject="post.subject"
    :html="post.html"
    :topics="post.topics"
  />
</template>

<script>
import Post from '~/components/Post'

import melody from '~/clients/melody'

import cookies from '~/helpers/cookies'

export default {
  asyncData({req, params}) {
    const { sessionid } = cookies(req.headers.cookie)
    const options = {}

    if (sessionid)
      options.headers = { Cookie: `sessionid=${sessionid};` }

    return melody.get('post', params.identifier, options)
      .then(post => ({ post }))
      .catch(err => {throw err})
  },

  components: {
    Post,
  },
}
</script>

