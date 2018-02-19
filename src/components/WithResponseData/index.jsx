import PropTypes from 'prop-types'
import React from 'react'

import { RENDERING_ENVIRONMENT_CLIENT, RENDERING_ENVIRONMENT_SERVER } from '../../constants'

import melody from 'clients/melody'

import withState from './state'

@withState
class WithResponseData extends React.Component {
  static propTypes = {
    childComponent: PropTypes.func.isRequired,
    environment: PropTypes.string.isRequired,
    requestURI: PropTypes.string.isRequired,

    setResponseData: PropTypes.func.isRequired,
    responseData: PropTypes.oneOf(
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    )
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

    return <ChildComponent {...proxyProps}>{ children }</ChildComponent>
  }
}

export default (uri) => {
  return ChildComponent => {
    if (typeof uri === 'function') uri = uri()

    // Preload data as soon as we can
    return props => {
      const responseData = melody.getCached(uri)

      if (!responseData) melody.get(uri)

      return <WithResponseData {...props} childComponent={ChildComponent} requestURI={uri} responseData={responseData} />
    }
  }
}
