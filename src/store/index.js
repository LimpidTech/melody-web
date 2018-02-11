import { createStore } from 'redux'

import { RENDERING_ENVIRONMENT_CLIENT, RENDERING_ENVIRONMENT_SERVER } from '../constants'

function getBaseURL () {
  if (typeof window === 'undefined') return 'http://localhost:8000/services/'
  return `${window.location.protocol}//${window.location.host}/services/`
}

// TODO: Look into better/conventional patterns for this
const ACTION_HANDLERS = Object.assign({})

const reducer = (currentState: Object, action: Object) => {
  const handler = ACTION_HANDLERS[action.type]
  if (!handler) return currentState
  return handler(currentState, action) || currentState
}

function getRenderingEnvironment () {
  if (typeof window !== 'undefined') return RENDERING_ENVIRONMENT_CLIENT
  return RENDERING_ENVIRONMENT_SERVER
}

function getInitial () {
  if (typeof window !== 'undefined' && window.initial && window.initial.state) return window.initial.state
  return INITIAL
}

const INITIAL = {
  environment: getRenderingEnvironment(),
  resources: {},
  responseData: [],
  services: {melody: getBaseURL()}
}

export default createStore(reducer, getInitial())
