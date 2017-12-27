import React from 'react'
import styled from 'styled-components'

export default styled(props => <div className={props.className} />)`
  margin: 1em auto 1ex;
  width: 3em;
  height: 3em;

  background-color: #29A3EC;
  border-radius: 100%;

  @media (min-width: 780px) {
    display: inline-block;
    width: 1.3em;
    height: 1.3em;
  }
`
