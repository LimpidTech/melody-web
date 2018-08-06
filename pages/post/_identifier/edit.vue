<template>
  <Editor
    :reference="post.local_reference"
    :subject="post.subject"
    :body="post.body"
    :topics="post.topics"
  />
</template>

<script>
import Editor from '~/components/Editor'

import { Metanic } from '~/clients/metanic'

import page from '~/helpers/pages'

export default page({
  components: {Editor},

  asyncData({ store, params }) {
    return Metanic.FromStore(store).get('post', params.identifier)
      .then(({ data }) => ({ post: data }))
      .catch(err => { throw err })
  },
})
</script>
