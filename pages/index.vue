<template>
  <Home :posts="collection.items" />
</template>

<script>
import Home from '~/components/Home'

import metanic from '~/clients/metanic'
import cookies from '~/helpers/cookies'

export default {
  asyncData({ req }) {
    const options = {}

    if (req.headers.cookie) {
      const { sessionid } = cookies(req.headers.cookie)
      if (sessionid) {
        options.headers = { Cookie: `sessionid=${sessionid};` }
      }
    }

    return metanic.get('collection', 'recent_posts', options)
      .then(collection => ({ collection }))
      .catch(err => {
        throw err
      })
  },

  components: {
    Home,
  },
}
</script>
