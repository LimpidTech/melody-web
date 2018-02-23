<template>
  <section>
    <header>
      <h2>Melody</h2>

      <nav>
        <a>home</a>
        <a>recent</a>
        <a>account</a>
      </nav>
    </header>

    <main>
      <nuxt/>
    </main>

    <footer>
      <a href='https://github.com/MelodyBoard'>Melody</a>
    </footer>
  </section>
</template>

<style>
  body {
    font-family: sans-serif;
    font-size: 1.35em;
    margin: 0;
    box-sizing: border-box;
  }

  #__layout * {
    margin-top: 0;
    margin-bottom: 0;
  }

  #__layout * ~ * {
    margin-top: 0.4em;
  }

  #__layout > section {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  #__layout > section > header {
    padding: 0.4rem 0.8rem 0;
    user-select: none;
  }

  #__layout > section > header > h2 {
    display: none;
    margin-top: 0;
    margin-right: 3rem;
  }

  #__layout > section > header > nav > a {
    display: block;
    color: #393939;
    text-decoration: none;
  }

  #__layout > section > header > nav > input {
    display: block;
    margin-top: 3em;
  }

  #__layout > section > main {
    flex-grow: 1;
    padding: 0.4em;
    margin-bottom: 0;
  }

  #__layout > section > footer {
    display: none;
    font-size: 1rem;
    text-align: center;
    user-select: none;
  }

  @media (min-width: 780px) {
    #__layout > section > section {
      flex-direction: column;
    }

    #__layout > section > header {
      height: 2em;
      overflow: visible;
    }

    #__layout > section > header > h2 {
      display: inline-block;
    }

    #__layout > section > header > nav {
      float: right;
      display: inline-block;
      margin-top: 0;
    }

    #__layout > section > header > nav > a {
      display: inline-block;
      padding-right: 3em;
      padding-bottom: 0.2em;
      font-size: 0.9em;
      vertical-align: bottom;
    }

    #__layout > section > header > nav > input {
      display: inline-block;
      margin-top: 0;
    }

    #__layout > section > main {
      max-width: 960px;
      margin: 0 auto;
    }

    #__layout > section > footer {
      display: block;
      margin-top: 6rem;
      min-height: 3rem;
    }
  }
</style>
