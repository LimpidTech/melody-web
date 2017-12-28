import { createStore } from 'redux'

const INITIAL = {
  resources: {},
}

// TODO: Look into better/conventional patterns for this
const ACTION_HANDLERS = {}

const reducer = (currentState: Object, action: Object) => {
  const handler = ACTION_HANDLERS[action.type]
  if (!handler) return currentState
  return handler(currentState, action) || currentState
}

function getInitial() {
  if (typeof window !== 'undefined' && window.initial && window.initial.state) return window.initial.state
  return INITIAL
}

export default createStore(reducer, getInitial())
