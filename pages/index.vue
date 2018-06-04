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
    if (process.browser) return

    const cookieData = cookies(context.req.headers.cookie)
    const options = {}

    const metanic = new Metanic(cookieData['authentication:token'])

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
