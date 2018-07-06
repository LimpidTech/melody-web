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
    onPostCreated(data) { window.location.assign('/') },
    onPostFailed(error) { console.error(error) },
  },
})
</script>
