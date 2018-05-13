<template>
  <Home :posts="collection.items" />
</template>

<script>
import Home from '~/components/Home'

import metanic from '~/clients/metanic'
import cookies from '~/helpers/cookies'

function getWrappedData(context, {data, metadata}) {
  Object.assign(context, {
    metanic: metadata,
  })

  return {data}
}

export default {
  asyncData(context) {
    const options = {}

    metanic.set('root', context.env.metanic.servicesUrl)

    if (context.req.headers.cookie) {
      const { sessionid } = cookies(context.req.headers.cookie)

      if (sessionid) {
        options.headers = { Cookie: `sessionid=${sessionid};` }
      }
    }

    return metanic.get(context.req, 'collection', 'recent_posts', options)
      .then(result => getWrappedData(context, result))
      .then(({ data }) => ({collection: data}))
      .catch(err => { throw err })
  },

  components: {
    Home,
  },
}
</script>
