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

export default {
  asyncData({ req, params }) {
    const metanic = new Metanic(req)
    const options = {}

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
