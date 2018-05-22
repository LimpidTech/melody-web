import Promise from 'bluebird'

import fetch from 'isomorphic-fetch'

export class RequestError extends Error {}
export class ServerError extends Error {}

export class Metanic {
  constructor(request) {
    this.root = process.env.METANIC_SERVICES_URL
    this.requestInfo = request
  }

  url(...parts) {
    if (parts.length === 0) return this.root
    return this.root + parts.join('/') + '/'
  }

  optionData(...parts) {
    const options = Object.assign({
      method: 'POST',
      credentials: 'include',
      headers: [
        ['Accept', 'application/json'],
        ['Content-Type', 'application/json'],
      ],
    }, ...parts)

    if (this.requestInfo && this.requestInfo.headers) {
      if (!this.requestInfo.headers.cookie) this.requestInfo.headers.cookie = ''
      this.requestInfo.headers.cookie += ';sessionid='
    }

    if (!options.body) return options
    if (typeof options.body === 'string') return options

    if (typeof options.body === 'object') {
      options.body = JSON.stringify(options.body)
    }

    return options
  }

  extractRequestComponents(...parts) {
    const urlParts = []
    const optionParts = []

    for (const part of parts) {
      if (typeof part === 'string') urlParts.push(part)
      else optionParts.push(part)
    }

    return {
      url: this.url(...urlParts),
      options: this.optionData(...optionParts),
    }
  }

  request(...parts) {
    const { url, options } = this.extractRequestComponents(...parts)

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

function withAuthentication(request, headers) {
  if (!request.header || !request.header.cookie) return headers

  /** TODO: Use JWT **/

  const cookie = ['Cookie', '']
  const result = []

  headers = headers || []

  for (const headerInfo of headers) {
    if (headerInfo[0].toLowerCase() !== 'authentication') {
      result.push(headerInfo)
    } else {
      cookie[1] = headerInfo[1]
    }
  }

  if (!cookie[1]) cookie[1] = 'Bearer '

  result.push(cookie)
  return result
}
