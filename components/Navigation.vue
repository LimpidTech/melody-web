<template>
  <section>
    <nav>
      <a href='/'>Home</a>
      <a href='/post/'>Create</a>
      <a href='/topic/'>Topics</a>
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
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0.3em;
    font-size: 1.4em;

    background-color: #333;
    color: #FEFEFE;

    > nav > a {
      display: block;
      color: inherit;
      text-decoration: none;
      padding: 0 1.5em 0.2em 0;
    }

    @media (min-width: 780px) {
      float: none;
      padding-right: 0;
      justify-content: start;
      flex-wrap: nowrap;
      font-size: 1em;
      flex-direction: row;

      > nav {
        &:first-child {
          flex-grow: 1;
        }

        > a {
          display: inline-block;
          vertical-align: bottom;
        }
      }
    }
  }
</style>
