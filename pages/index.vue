<template>
  <Home :posts="collection.items" />
</template>

<script>
import Cookies from '~/helpers/cookies'

import Home from '~/components/Home'

import { Metanic } from '~/clients/metanic'

function getWrappedData(context, {data, metadata}) {
  Object.assign(context, {
    metanic: metadata,
  })

  return {data}
}

export default {
  asyncData(context) {
    const cookies = new Cookies(context.req.headers.cookie)

    const token = cookies.get('authentication:token')
    const metanic = new Metanic()

    const options = {
      headers: new Headers(),
    }

    if (token) {
      options.headers.append('Authorization', `JWT ${token}`)
    }

    metanic.post('jwt', 'verify', options).then(console.log)

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
