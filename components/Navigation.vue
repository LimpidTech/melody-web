<template>
  <nav>
    <a href='/'>Home</a>
    <a href='/login/'>Login</a>

    <search />
  </nav>
</template>

<script>
import Search from '~/components/Search'

export default {
  components: {Search}
}
</script>

