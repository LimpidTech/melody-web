<template>
  <Editor
    :reference="post.local_reference"
    :subject="post.subject"
    :body="post.body"
    :topics="post.topics"
    :created=onPostCreated
    :failed=onPostFailure
  />
</template>

<script>
import Editor from '~/components/Editor'

import { Metanic } from '~/clients/metanic'

import page from '~/helpers/pages'

export default page({
  components: {Editor},

  asyncData({ store, params }) {
    const metanic = Metanic.FromStore(store)

    return metanic.get('post', params.identifier)
      .then(({ data }) => ({ post: data }))
      .catch(err => { throw err })
  },

  methods: {
    onPostCreated(post) {
      // window.location.assign(`/post/${post.local_reference}`)
    },

    onPostFailure: console.error,
  },
})
</script>
