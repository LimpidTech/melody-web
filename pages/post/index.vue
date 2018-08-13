<template>
  <section>
    <Editor v-if=isAuthenticated :created=created />
    <Authenticator v-else />
  </section>
</template>

<script>
import Editor from '~/components/Editor'
import Authenticator from '~/components/Authenticator'
import page from '~/helpers/pages'

export default page({
  components: { Editor, Authenticator },

  asyncData: ({ store }) => ({isAuthenticated: store.state.user.isAuthenticated}),

  methods: {
    created: function (post) {
      this.$router.push(`/post/${post.data.local_reference}/edit/`)
    },
  },
})
</script>
