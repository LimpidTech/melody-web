import React from 'react'

import styled from 'styled-components'

const Application = props => (
  <section className={props.className}>
    <header>
      <h1>Melody</h1>
      <nav><input type="text" placeholder="Search" /></nav>
    </header>

    <main>
      <article>
        <header><h2>Example</h2></header>
        <p></p>
        <footer></footer>
      </article>
    </main>

    <footer></footer>
  </section>
)

export default styled(Application)`
  display: flex;
  flex-direction: row;
  min-height: 100vh;

  > header {
    padding: 0.4rem 0.8rem 0.1rem;
    background-color: #ECECFE;
    user-select: none;
  }

  > header > h1 {
    display: none;
  }

  > main {
    flex-grow: 1;
    padding: 0.4em;
  }

  > footer {
    display: none;
  }

  @media (min-width: 780px) {
    flex-direction: column;

    > header > h1 {
      display: inline-block;
    }

    > header > nav {
      float: right;
      display: inline-block;
      margin-top: 0;
    }

    > header > nav > a {
      display: inline-block;
      padding-right: 1em;
      font-size: 0.9em;
    }

    > main {
      max-width: 960px;
      min-width: 42em;
      margin: 0 auto;
    }

    > footer {
      display: block;
      background-color: #ECECFE;
      margin-top: 6rem;
      min-height: 3rem;
    }
  }
`
