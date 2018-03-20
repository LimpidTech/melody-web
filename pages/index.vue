<template>
  <Home :posts="collection.items" />
</template>

<script>
import Home from '~/components/Home'

import melody from '~/clients/melody'

export default {
  asyncData({params}) {
    return melody.get('collection', 'recent_posts')
      .then(collection => ({ collection }))
      .catch(err => {throw err})
  },

  components: {
    Home,
  },
}
</script>
