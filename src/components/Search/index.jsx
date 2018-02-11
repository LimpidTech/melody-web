import PropTypes from 'prop-types'
import React from 'react'

import styled from 'styled-components'

import Input from 'components/Input'

import withState from './state'

const Search = props => {
  const { setSize, ...proxyProps } = props

  return (
    <Input
      {...proxyProps}
      onFocus={() => setSize(18)}
      onBlur={() => setSize(3)}
      placeholder='Search'
    />
  )
}

Search.propTypes = {
  setSize: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
}

export default withState(Search)
