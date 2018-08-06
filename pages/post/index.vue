<template>
  <Editor :created=created />
</template>

<script>
import Editor from '~/components/Editor'
import page from '~/helpers/pages'

export default page({
  components: { Editor },

  methods: {
    created: function (post) {
      this.$router.push(`/post/${post.data.local_reference}/edit/`)
    },
  },
})
</script>
