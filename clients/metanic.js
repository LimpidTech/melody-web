import Promise from 'bluebird'
import fetch from 'isomorphic-fetch'

export class RequestError extends Error {}
export class ServerError extends Error {}

export class Metanic {
  static FromStore(store) {
    // Use the store to pull authentication information during
    // server-side rendering, so that we can render the user's
    // proper page content without client-side XHR.
    return new Metanic(store.state.authentication.token)
  }

  constructor(token) {
    this.root = process.env.METANIC_SERVICES_URL
    this.authenticationToken = token || null
  }

  url(...parts) {
    return this.root + parts.join('/') + '/'
  }

  optionData(...parts) {
    const headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })

    const options = Object.assign({
      method: 'POST',
      credentials: 'include',
      headers,
    }, ...parts)

    if (this.authenticationToken) {
      headers.append('Authorization', 'JWT ' + this.authenticationToken)
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

    let request = fetch(url, options)
      .then(verify)
      .then(extractHeaders)

    // DELETE and HEAD requests don't return response bodies
    if (options.method !== 'DELETE' && options.method !== 'HEAD') {
      request = request.then(toJSON)
    }

    return new Promise((resolve, reject) =>
      request.then(resolve, reject)
    )
  }

  delete(...options) { return this.request(...options, {method: 'DELETE'}) }
  get(...options) { return this.request(...options, {method: 'GET'}) }
  head(...options) { return this.request(...options, {method: 'HEAD'}) }
  options(...options) { return this.request(...options, {method: 'OPTIONS'}) }
  post(...options) { return this.request(...options, {method: 'POST'}) }
  put(...options) { return this.request(...options, {method: 'PUT'}) }

  applyMeta({ store, res }) {
    // Apply latest Metanic metadata from request headers into the store

    return response => {
      res.setHeader('Cache-Control', 'No-Cache')
      store.commit('updateUser', response.metadata.user)
      return response
    }
  }
}

function responseError(response) {
  let message

  if (response.status === 400) {
    message = `Unexpected or malformed data was sent to ${response.url}`
  } else if (response.status < 200 || response.status > 299) {
    message = `Received unexpected response status (${response.status}) from ${response.url}.`
  }

  if (!message) { return }

  return response.text()
    .catch(() => { throw new Error(`${message}. Response body failed to be read.`) })
    .then(text => { throw new Error(`${message} ${text}`) })
}

function verify(response) {
  switch (response.status) {
    case 401:
      // TODO: Request new authentication and replay request
      break
  }

  const errorOccured = responseError(response)
  if (errorOccured) { return errorOccured }
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
