<template>
  <div>
    <nuxt-link v-if="user.isAuthenticated" to="/account/">{{ user.username }}</nuxt-link>
    <nuxt-link v-if="!user.isAuthenticated" to="/login/">Login</nuxt-link>
  </div>
</template>

<script>
export default {
  data({ $store }) { return { user: $store.state.user || {} } },
}
</script>

<style scoped>
  margin: 0.2em auto 1ex;
  width: 3em;
  height: 3em;

  background-color: #29A3EC;
  border-radius: 100%;

  @media (min-width: 780px) {
    display: inline-block;
    width: 1.3em;
    height: 1.3em;
  }
</style>
