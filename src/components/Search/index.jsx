import React from 'react'
import styled from 'styled-components'

import Input from 'components/Input'

import withState from './state'

const Search = props => (
  <Input
    {...props}
    onFocus={() => props.setSize(18)}
    onBlur={() => props.setSize(3)}
    placeholder='Search'
  />
)

export default withState(Search)
