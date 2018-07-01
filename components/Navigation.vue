<template>
  <nav>
    <a href='/'>Home</a>
    <UserMenu />
    <search />
  </nav>
</template>

<script>
import Search from '~/components/Search'
import UserMenu from '~/components/UserMenu'

export default {
  components: {
    Search,
    UserMenu,
  },
}
</script>
