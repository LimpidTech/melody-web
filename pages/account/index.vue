<template>
  <h2>{{ user.username }}</h2>
</template>

<script>
import page from '~/helpers/pages'

export default page({
  computed: {
    user() { return this.$store.state.user },
  },
})
</script>
