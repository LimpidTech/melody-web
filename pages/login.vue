<template>
  <div>
    <Authenticator />
  </div>
</template>

<script>
import Authenticator from '~/components/Authenticator'
import metanic from '~/clients/metanic'

export default {
  components: {
    Authenticator,
  },

  fetch(context) {
    metanic.set('root', context.env.metanic.servicesUrl)
  },
}
</script>
