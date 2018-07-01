import moment from 'moment'

import { Metanic } from '~/clients/metanic'
import cookies from '~/helpers/cookies'

const LOCAL_USER_KEY = 'metanic:user'

const metanic = new Metanic()

function getInitialUserData() {
  const user = {
    identifier: null,
    isAuthenticated: false,
    username: null,
  }

  if (process.server) return user

  if (window.localStorage) {
    const local = window.localStorage.getItem(LOCAL_USER_KEY)

    if (local) {
      Object.assign(user, JSON.parse(local))
    }
  }

  return user
}

export const state = () => ({
  user: getInitialUserData(),
})

export const getters = {
  authenticationToken: state => state.authenticationToken,
}

export const mutations = {
  setAuthenticationToken: (state, {token, user}) => {
    // Ensure that we don't store tokens / user data on the server
    if (!process.browser) return

    const expiry = moment().add(14, 'days')
    document.cookie = cookies(document.cookie, 'authentication:token', token, expiry.toDate(), '/')

    state.user = {
      isAuthenticated: user.isAuthenticated,
      username: user.username,
      identifier: user.identifier,
    }

    if (window.localStorage) {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(state.user))
    }

    // Don't store user token in localStorage.
    state.user.token = token
  },
}

export const actions = {
  nuxtServerInit: context => {},
  authenticate: ({ commit }, data) => {
    metanic.post('jwt', 'obtain', {body: data})
      .then(({ data, metadata }) => {
        commit('setAuthenticationToken', {
          token: data.token,
          user: metadata.user,
        })
      })
  },
}
