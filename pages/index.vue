<template>
  <Home :posts="collection.items" />
</template>

<script>
import Home from '~/components/Home'
import { Metanic } from '~/clients/metanic'

import page from '~/helpers/pages'

export default page({
  components: {Home},

  asyncData({ store }) {
    return Metanic.FromStore(store)
      .get('collection', 'recent_posts')
      .then(({ data }) => ({collection: data}))
      .catch(err => { throw err })
  },
})
</script>
