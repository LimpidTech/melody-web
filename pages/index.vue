<template>
  <Home :posts="collection.items" />
</template>

<script>
import Home from '~/components/Home'
import cookies from '~/helpers/cookies'

import { Metanic } from '~/clients/metanic'

function getWrappedData(context, {data, metadata}) {
  Object.assign(context, {
    metanic: metadata,
  })

  return {data}
}

export default {
  asyncData(context) {
    const options = {}
    const metanic = new Metanic(context.req)

    if (context.req.headers.cookie) {
      const { sessionid } = cookies(context.req.headers.cookie)

      if (sessionid) {
        options.headers = { Cookie: `sessionid=${sessionid};` }
      }
    }

    return metanic.get('collection', 'recent_posts', options)
      .then(result => getWrappedData(context, result))
      .then(({ data }) => ({collection: data}))
      .catch(err => { throw err })
  },

  components: {
    Home,
  },
}
</script>
