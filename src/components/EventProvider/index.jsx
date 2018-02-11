import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Emitter from 'yaemit'

export default class EventProvider extends Component {
  static childContextTypes = {
    EventProvider: PropTypes.object
  }

  static propTypes = {
    eventMap: PropTypes.object.isRequired
  }

  getChildContext () {
    const context = {}
    const { eventMap } = this.props

    context.EventProvider = new Emitter()

    for (const eventName in eventMap) {
      const handler = eventMap[eventName]
      context.EventProvider.on(eventName, (...args) => {
        return new Promise((resolve, reject) => {
          return resolve(handler(...args))
        })
      })
    }

    return context
  }

  render () {
    return this.props.children
  }
}
