<template>
  <nav>
    <div v-if="!user.isAuthenticated">
      <a href="/account/login/">Login</a>
      <a href="/account/register/">Register</a>
    </div>

    <a v-else href="/account/">
      <span v-if="!user.avatar">{{ user.username }}</span>
      <img v-if="user.avatar" v-src="user.avatar" />
    </a>
  </nav>
</template>

<script>
export default {
  data({ $store }) { return { user: $store.state.user || {} } },
}
</script>

<style scoped lang="scss">
  nav {
    a {
      color: #393939;
      text-decoration: none;
    }

    @media (min-width: 780px) {
      display: inline-block;

      a {
        vertical-align: bottom;
      }

      a ~ a {
        padding: 0 0 0 1.5em;
      }
    }
  }
</style>
