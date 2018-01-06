import React from 'react'
import styled from 'styled-components'

import Input from 'components/Input'

import withState from './state'


const Search = props => (
  <Input
    size={props.size}
    onFocus={() => props.setSize(18)}
    onBlur={() => props.setSize(3)}
    type='text'
    placeholder='Search' />
)

export default withState(Search)
