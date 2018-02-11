import PropTypes from 'prop-types'
import React from 'react'

import { RENDERING_ENVIRONMENT_CLIENT, RENDERING_ENVIRONMENT_SERVER } from 'constants'

import melody from 'clients/melody'

import withState from './state'

@withState
class WithResponseData extends React.Component {
  static propTypes = {
    childComponent: PropTypes.func.isRequired,
    environment: PropTypes.string.isRequired,
    requestURI: PropTypes.string.isRequired,

    setResponseData: PropTypes.func.isRequired,
    responseData: PropTypes.oneOf([
      PropTypes.object,
      PropTypes.array
    ])
  }

  componentWillMount () {
    const { requestURI, setResponseData, environment } = this.props

    if (environment === RENDERING_ENVIRONMENT_CLIENT) {
      melody.get(requestURI)
        .then(setResponseData)
        .catch(() => setResponseData(null))
    }
  }

  render () {
    const {
      requestURI,
      environment,
      childComponent: ChildComponent,
      setResponseData,
      responseData,
      as,
      children,
      ...proxyProps
    } = this.props

    proxyProps.as = as
    proxyProps[as] = responseData

    if (this.props.environment === RENDERING_ENVIRONMENT_SERVER) {
      proxyProps[proxyProps.as] = proxyProps[proxyProps.as] || melody.getCached(requestURI)
    }

    return <ChildComponent {...proxyProps}>{ children }</ChildComponent>
  }
}

export default (uri) => {
  return ChildComponent => {
    if (typeof uri === 'function') uri = uri()

    // Preload data as soon as we can
    return props => {
      melody.get(uri).then(response => response.data)

      return (
        <WithResponseData {...props} childComponent={ChildComponent} requestURI={uri} />
      )
    }
  }
}
