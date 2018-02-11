import melody from 'clients/melody'

function authenticate ({username, password}) {
  melody.post('authentication', {
    body: {username, password}
  })
}

export default {
  'authentication:authenticate': authenticate
}
