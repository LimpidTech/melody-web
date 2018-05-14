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

import { Metanic } from '~/clients/metanic'

import cookies from '~/helpers/cookies'

export default {
  asyncData({ req, params }) {
    const { sessionid } = cookies(req.headers.cookie)

    const metanic = new Metanic(req)
    const options = {}

    if (sessionid) {
      options.headers = { Cookie: `sessionid=${sessionid};` }
    }

    return metanic.get('post', params.identifier, options)
      .then(post => ({ post }))
      .catch(err => {
        throw err
      })
  },

  components: {
    Post,
  },
}
</script>
