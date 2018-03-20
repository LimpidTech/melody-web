<template>
  <Home :posts="collection.items" />
</template>

<script>
import Home from '~/components/Home'

import melody from '~/clients/melody'

import cookies from '~/helpers/cookies'

export default {
  asyncData({req}) {
    const { sessionid } = cookies(req.headers.cookie)
    const options = {}

    if (sessionid)
      options.headers = { Cookie: `sessionid=${sessionid};` }

    return melody.get('collection', 'recent_posts', options)
      .then(collection => ({ collection }))
      .catch(err => {throw err})
  },

  components: {
    Home,
  },
}
</script>
