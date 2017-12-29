function authenticate(username, password) {
  return fetch('/account/authenticate/', {
    url: '/account/authenticate/',
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
    })
  })
}

export default {
  'authentication:authenticate': authenticate,
}
