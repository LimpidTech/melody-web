function authenticate({username, password}) {
  return fetch('/services/authentication/', {
    method: 'POST',
    credentials: 'same-origin',

    body: JSON.stringify({
      username,
      password,
    }),

    headers: [
      ['Accept', 'application/json'],
      ['Content-Type', 'application/json'],
    ],
  })
}

export default {
  'authentication:authenticate': authenticate,
}
