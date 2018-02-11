import React from 'react'

import { RENDERING_ENVIRONMENT_SERVER } from 'constants'

import withState from './state'

function Loading (props) {
  if (props.environment === RENDERING_ENVIRONMENT_SERVER) { throw new Error('Loading view should only be used on client.') }

  return <h2>Loading</h2>
}

export default withState(Loading)
