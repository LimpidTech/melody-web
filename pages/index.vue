<template>
  <Home
    :posts="collection.items"
    :refresh=refreshCollection
  />
</template>

<script>
import Home from '~/components/Home'

import page from '~/helpers/pages'

export default page({
  components: {Home},

  asyncData({ store }) {
    return store.dispatch('getCollection', 'recent_posts')
      .then(({ data }) => ({collection: data}))
      .catch(err => { throw err })
  },

  methods: {
    assignCollection(response) {
      // I feel like Vue is going to get angry about this one
      this.collection = response.data
    },

    refreshCollection: function () {
      return this.$store.dispatch('getCollection', 'recent_posts')
        .then(this.assignCollection)
    },
  },
})
</script>
