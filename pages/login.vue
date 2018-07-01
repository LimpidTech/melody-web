<template>
  <div>
    <Authenticator />
  </div>
</template>

<script>
import Authenticator from '~/components/Authenticator'
import page from '~/helpers/pages'

export default page({
  components: {Authenticator},
})
</script>
