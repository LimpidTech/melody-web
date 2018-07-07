<template>
  <Post
    :reference="post.local_reference"
    :subject="post.subject"
    :html="post.html"
    :topics="post.topics"
    :user="post.author"
  />
</template>

<script>
import Post from '~/components/Post'

import { Metanic } from '~/clients/metanic'

import page from '~/helpers/pages'

export default page({
  components: {Post},

  asyncData({ store, params }) {
    const metanic = Metanic.FromStore(store)

    return metanic.get('post', params.identifier)
      .then(({ data }) => ({ post: data }))
      .catch(err => { throw err })
  },
})
</script>
