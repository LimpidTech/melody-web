import React, { Component } from 'react'

import withState from './state'

@withState
export default class WithCollection extends Component {
  shouldComponentUpdate ({...next}) {
    if (this.props.collection !== next.collection) { return true }

    if (this.props.collectionItems !== next.collectionItems) { return true }

    return false
  }

  render () {
    const {
      children,
      collection, as, using: Using,
      emit,
      ...proxyProps
    } = this.props

    if (!this.props[as]) return null

    proxyProps[as] = this.props[as].items
    return <Using {...proxyProps}>{children}</Using>
  }
}
