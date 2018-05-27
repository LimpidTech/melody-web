<template>
  <Topic :posts="topic.posts" />
</template>

<script>
import Topic from '~/components/Topic'

import { Metanic } from '~/clients/metanic'

export default {
  asyncData({ req, params }) {
    const metanic = new Metanic(req)
    const options = {}

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
