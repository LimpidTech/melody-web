<template>
  <Topic :posts="topic.posts" />
</template>

<script>
import Topic from '~/components/Topic'

import { Metanic } from '~/clients/metanic'

import cookies from '~/helpers/cookies'

export default {
  asyncData({ req, params }) {
    const { sessionid } = cookies(req.headers.cookie)

    const metanic = new Metanic(req)
    const options = {}

    if (sessionid) {
      options.headers = {
        Cookie: `sessionid=${sessionid};`,
      }
    }

    return metanic
      .get('topic', params.identifier, options)
      .then(topic => ({ topic }))
      .catch(err => {
        throw err
      })
  },

  components: {
    Topic,
  },
}
</script>
