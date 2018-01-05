import React, { Component } from 'react'

import withState from './state'

class WithCollection extends Component {
  shouldComponentUpdate({...next}) {
    if (this.props.collection !== next.collection)
      return true

    if (this.props.collectionItems !== next.collectionItems)
      return true

    return false
  }

  render() {
    const {
      collection, as, using,
      collectionItems,
      emit,
      ...proxyProps
    } = this.props

    proxyProps[as] = collectionItems

    // TODO: Update collectionItems
    // emit.retrieve(collection)

    return using(proxyProps)
  }
}

export default withState(WithCollection)
