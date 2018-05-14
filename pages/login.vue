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

  fetch({ env }) {
    metanic.set('root', env.metanic.servicesUrl)
  },
}
</script>
