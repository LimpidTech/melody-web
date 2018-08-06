<template>
  <section>
    <header>
      <Navigation />
    </header>

    <main>
      <nuxt />
    </main>

    <footer>
      <a href="https://www.patreon.com/metanic">
         Powered by Metanic
      </a>
    </footer>
  </section>
</template>

<script>
import UserMenu from '~/components/UserMenu'
import Navigation from '~/components/Navigation'

export default {
  head: {
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Didact+Gothic',
      },
    ],
  },

  components: {
    Navigation,
    UserMenu,
  },
}
</script>

<style lang='scss'>
html {
  font-family: "Didact Gothic", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

h4, h5, h6 {
  font-weight: normal;
  font-style: normal;
}

a {
  outline: none;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
}

#__layout > section {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > header {
    padding: 0.4rem 0.8rem 0;
    user-select: none;
  }

  > header > h2 {
    display: none;
    margin-top: 0;
  }

  > main {
    flex-grow: 1;
    margin: 0 auto;
    width: 100%;
    max-width: 95vw;
    padding: 0.4em;
    padding-top: 1em;
    font-size: 1.2em;
  }

  > footer {
    display: none;
    font-size: 0.8em;
    text-align: center;
    user-select: none;
  }

  @media (min-width: 780px) {
    flex-direction: column;

    > header {
      height: 2em;
      overflow: visible;

      > h2 {
        display: inline-block;
      }
    }

    > footer {
      display: block;
      padding: 1em;
    }
  }
}
</style>
