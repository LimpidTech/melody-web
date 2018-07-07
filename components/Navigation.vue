<template>
  <section>
    <nav>
      <a href='/'>Home</a>
      <a href='/post/'>Create</a>
    </nav>

    <UserMenu />
  </section>
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
  * {
    display: flex;
    flex-direction: column;
    float: right;
    padding-right: 0.3em;

    > nav > a {
      display: block;
      color: inherit;
      text-decoration: none;
    }

    @media (min-width: 780px) {
      float: none;
      flex-direction: row;
      padding-right: 0;

      > nav {
        &:first-child {
          flex-grow: 1;
        }

        > a {
          display: inline-block;
          margin: 0 1.5em 0.2em 0;
          vertical-align: bottom;
        }
      }
    }
  }
</style>
