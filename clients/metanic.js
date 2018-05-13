import Promise from 'bluebird'

import fetch from 'isomorphic-fetch'

const settings = {
  sessionCookie: process.env.METANIC_SESSION_COOKIE || 'sessionid',
  root: process.env.METANIC_SERVICES_URL || 'http://localhost:8000/services/',
}

function set(key, value) { settings[key] = value }

export class RequestError extends Error {}
export class ServerError extends Error {}

export class Metanic {
  constructor(request) {
    this.requestInfo = request
  }

  request(...parts) {
    const { url, options } = extractRequestComponents(this.requestInfo, ...parts)
    if (this.requestInfo) options.headers = withAuthentication(this.requestInfo, options.headers)

    return new Promise((resolve, reject) =>
      fetch(url, options)
        .then(verify)
        .then(extractHeaders)
        .then(toJSON)
        .then(resolve)
        .catch(reject)
    )
  }

  delete(...options) { return this.request(...options, {method: 'DELETE'}) }
  get(...options) { return this.request(...options, {method: 'GET'}) }
  head(...options) { return this.request(...options, {method: 'HEAD'}) }
  options(...options) { return this.request(...options, {method: 'OPTIONS'}) }
  post(...options) { return this.request(...options, {method: 'POST'}) }
  put(...options) { return this.request(...options, {method: 'PUT'}) }
}

export default { set }

function extractRequestComponents(request, ...parts) {
  const urlParts = []
  const optionParts = []

  for (const part of parts) {
    if (typeof part === 'string') urlParts.push(part)
    else optionParts.push(part)
  }

  return {
    url: url(...urlParts),
    options: options(request, ...optionParts),
  }
}

function url(...parts) {
  if (parts.length === 0) return settings.root
  return settings.root + parts.join('/') + '/'
}

function options(request, ...parts) {
  const options = Object.assign({
    method: 'POST',
    credentials: 'include',
    headers: [
      ['Accept', 'application/json'],
      ['Content-Type', 'application/json'],
    ],
  }, ...parts)

  if (request && request.headers) {
    if (!request.headers.cookie) request.headers.cookie = ''
    request.headers.cookie += ';sessionid='
  }

  if (!options.body) return options
  if (typeof options.body === 'string') return options

  if (typeof options.body === 'object') {
    options.body = JSON.stringify(options.body)
  }

  return options
}

function verify(response) {
  if (response.status > 399 && response.status < 500) {
    throw new RequestError(
      'Unexpected or malformed data was sent to ' + response.url
    )
  }

  if (response.status > 299 || response.status < 200) {
    throw new ServerError(
      'Received unexpected response from ' + response.url
    )
  }

  return response
}

function extractHeaders(response) {
  return {
    response,

    metadata: {
      user: {
        isAuthenticated: response.headers.get('x-metanic-isauthenticated') === 'True',
        username: response.headers.get('x-metanic-username'),
        identifier: response.headers.get('x-metanic-identifier'),
      },
    },
  }
}

function toJSON(context) {
  return context.response.json().then(data => ({
    ...context,
    data,
  }))
}

function getRequestSession(cookie) {
  if (!cookie) return

  const sessionIndex = cookie.indexOf(settings.sessionCookie)
  if (sessionIndex === -1) return

  const sessionValueIndex = sessionIndex + settings.sessionCookie.length + 1
  const sessionValueWithSuffix = cookie.slice(sessionValueIndex)

  const sessionValueEndIndex = sessionValueWithSuffix.indexOf(';')
  if (sessionValueEndIndex === -1) return sessionValueWithSuffix

  return sessionValueEndIndex.slice(0, sessionValueEndIndex)
}

function withAuthentication(request, headers) {
  if (!request.header || !request.header.cookie) return headers

  const sessionId = getRequestSession(request.headers.cookie)
  if (!sessionId) return headers

  const cookie = ['Cookie', '']
  const result = []

  headers = headers || []

  for (const headerInfo of headers) {
    if (headerInfo[0].toLowerCase() !== 'cookie') {
      result.push(headerInfo)
    } else {
      cookie[1] = headerInfo[1]
    }
  }

  const sessionString = `${settings.sessionCookie}=${sessionId}`

  if (cookie[1].length > 0) {
    cookie[1] += sessionString
  } else {
    cookie[1] = sessionString
  }

  result.push(cookie)
  return result
}
