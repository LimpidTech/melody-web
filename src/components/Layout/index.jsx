import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom'

function Layout(props) {
  const { className, children } = props

  return (
    <section className={className}>
      <header>
        <h2>Melody</h2>
        <nav>
          <Link to="/">Home</Link>
          <Link to="topics/">Topics</Link>
          <input type="text" placeholder="Search" />
        </nav>
      </header>
      <main>{ children }</main>
      <footer><a href="https://github.com/MelodyBoard">Melody</a></footer>
    </section>
  )
}


export default styled(Layout)`
  display: flex;
  flex-direction: row;
  min-height: 100vh;

  > header {
    padding: 0.4rem 0.8rem 0.1rem;
    user-select: none;
  }

  > header > h2 {
    display: none;
  }

  > main {
    flex-grow: 1;
    padding: 0.4em;
    margin-bottom: 0;
  }

  > footer {
    display: none;
    font-size: 1rem;
    text-align: center;
  }

  @media (min-width: 780px) {
    flex-direction: column;

    > header > h2 {
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
      padding-bottom: 0.2em;
      font-size: 0.9em;
      vertical-align: bottom;
    }

    > main {
      max-width: 960px;
      min-width: 42em;
      margin: 0 auto;
    }

    > footer {
      display: block;
      margin-top: 6rem;
      min-height: 3rem;
    }
  }
`
