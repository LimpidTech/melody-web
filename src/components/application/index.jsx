import React from 'react'

import styled from 'styled-components'

const Application = props => (
  <section className={props.className}>
    <header>
      <h1>Melody</h1>
    </header>

    <main></main>

    <footer></footer>
  </section>
)

export default styled(Application)`
  padding: 0.4rem 0.8rem 0.1rem;
  background-color: #ECECFE;
`
