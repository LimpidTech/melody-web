import Promise from 'bluebird'

import fetch from 'isomorphic-fetch'

const ROOT_ENDPOINT = 'http://localhost:8000/services/'

function url (...parts) {
  if (parts.length === 0) return ROOT_ENDPOINT
  return ROOT_ENDPOINT + parts.join('/') + '/'
}

function options (...parts) {
  const options = Object.assign({
    method: 'POST',
    credentials: 'include',
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

function request (...parts) {
  const urlParts = []
  const optionParts = []

  for (const part of parts) {
    if (typeof part === 'string') urlParts.push(part)
    else optionParts.push(part)
  }

  const requestURL = url(...urlParts)
  const requestOptions = options(...optionParts)

  return new Promise((resolve, reject) =>
    fetch(requestURL, requestOptions)
      .then(verify)
      .then(resolve)
      .catch(reject)
  )
}

export default {
  request,
  url,

  delete: request.bind(this, {method: 'DELETE'}),
  get: request.bind(this, {method: 'GET'}),
  head: request.bind(this, {method: 'HEAD'}),
  options: request.bind(this, {method: 'OPTIONS'}),
  post: request.bind(this, {method: 'POST'}),
  put: request.bind(this, {method: 'PUT'}),
}
