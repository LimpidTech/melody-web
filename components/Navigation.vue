<template>
  <nav>
    <a href='/'>Home</a>
    <UserMenu />
    <Search />
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

<style scoped lang="scss">
nav {
  display: flex;
  flex-direction: column;

  > a {
    color: #393939;
    text-decoration: none;
  }

  @media (min-width: 780px) {
    float: right;
    flex-direction: row;

    > a, input {
      display: inline-block;
      margin: 0 1.5em 0.2em;
      vertical-align: bottom;
    }
  }
}
</style>
