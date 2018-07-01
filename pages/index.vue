<template>
  <Home :posts="collection.items" />
</template>

<script>
import Home from '~/components/Home'

import page from '~/helpers/pages'

export default page({
  components: {Home},
})
</script>
