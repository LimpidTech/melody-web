import Promise from 'bluebird'

import fetch from 'isomorphic-fetch'
import store from 'store'
import { RENDERING_ENVIRONMENT_SERVER } from 'constants'

const requestBuffer = new Set()
const responseCache = new Map()

function url (...parts) {
  const root = store.getState().services.melody
  if (parts.length === 0) return root
  return root + parts.join('/') + '/'
}

function options (...parts) {
  const options = Object.assign({
    method: 'POST',
    credentials: 'same-origin',
    headers: [
      ['Accept', 'application/json'],
      ['Content-Type', 'application/json']
    ]
  }, ...parts)

  // Ensure JSON is parsed
  if (
    typeof options.body === 'undefined' ||
    typeof options.body === 'string'
  ) return options

  options.body = JSON.stringify(options.body)

  return options
}

function verify (response) {
  if (response.status < 200 || response.status > 299) {
    throw new Error(
      'Received unexpected response from Melody services.'
    )
  }

  return response.json()
}

function withServerEntries (url, options, promise) {
  if (store.getState().environment !== RENDERING_ENVIRONMENT_SERVER) { return promise }

  requestBuffer.add(promise)

  return promise.finally()
}

function cacheResources (response) {
  if (response.url) responseCache.set(response.url, response)
  return response
}

function getCached (resourceUrl) {
  const cachedValue = responseCache.get(url(resourceUrl))
  if (typeof cachedValue !== 'undefined') return cachedValue
  return null
}

function request (...parts) {
  const urlParts = []
  const optionParts = []

  for (const part of parts) {
    if (typeof part === 'string') urlParts.push(part)
    else optionParts.push(part)
  }

  const requestURL = url(...urlParts)
  const requestOptions = options(...optionParts)

  const promise = new Promise(
    (resolve, reject) => fetch(requestURL, requestOptions)
      .then(verify)
      .then(cacheResources)
      .then(resolve)
      .catch(reject))

  return withServerEntries(requestURL, requestOptions, promise)
}

export default {
  getCached,
  request,

  delete: request.bind(this, {method: 'DELETE'}),
  get: request.bind(this, {method: 'GET'}),
  head: request.bind(this, {method: 'HEAD'}),
  options: request.bind(this, {method: 'OPTIONS'}),
  post: request.bind(this, {method: 'POST'}),
  put: request.bind(this, {method: 'PUT'}),

  awaitAllResponses: () => Promise.all(requestBuffer)
}
