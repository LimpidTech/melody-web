<template>
  <Editor
    :created=onPostCreated
    :failed=onPostFailed
  />
</template>

<script>
import Editor from '~/components/Editor'
import page from '~/helpers/pages'

export default page({
  components: { Editor },

  methods: {
    onPostCreated(post) { window.location.assign(`/post/${post.local_reference}`) },
    onPostFailed: console.error,
  },
})
</script>
