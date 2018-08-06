<template>
  <nav>
    <a v-if="!user.isAuthenticated" href="/account/login/">Login</a>
    <a v-if="!user.isAuthenticated" href="/account/register/">Register</a>

    <span v-if="user.isAuthenticated && !user.avatar">Welcome, {{ user.username }}</span>
    <img v-if="user.isAuthenticated && user.avatar" v-src="user.avatar" />
  </nav>
</template>

<script>
export default {
  data({ $store }) { return { user: $store.state.user } },
}
</script>

<style scoped lang="scss">
  * > a {
    text-decoration: none;
  }

  @media (min-width: 780px) {
    display: inline-block;

    > a {
      vertical-align: bottom;
    }

    a ~ a {
      padding: 0 0 0 1.5em;
    }
  }
</style>
