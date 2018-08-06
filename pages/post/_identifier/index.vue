<template>
  <Post
    :reference="post.local_reference"
    :subject="post.subject"
    :html="post.html"
    :summary="post.summary"
    :topics="post.topics"
    :author="post.author"
    :pinned="post.is_pinned"
    :summarize=false
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
