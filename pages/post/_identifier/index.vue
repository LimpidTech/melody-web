<template>
  <Post
    :reference="post.local_reference"
    :subject="post.subject"
    :html="post.html"
    :summary="post.summary"
    :topics="post.topics"
    :author="post.author"
    :isPinned="post.is_pinned"
    :summarize=false
    :deleted=deleted
  />
</template>

<script>
import Post from '~/components/Post'

import page from '~/helpers/pages'

export default page({
  components: {Post},

  asyncData({ store, params }) {
    return store.dispatch('getPost', params.identifier)
      .then(({ data }) => ({ post: data }))
      .catch(err => { throw err })
  },

  methods: {
    deleted: function () {
      this.$router.push('/')
    },
  },
})
</script>
