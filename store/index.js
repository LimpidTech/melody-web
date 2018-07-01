import moment from 'moment'

import { Metanic } from '~/clients/metanic'
import cookies from '~/helpers/cookies'

const metanic = new Metanic()

export const state = () => ({
  user: {
    identifier: null,
    isAuthenticated: false,
    username: null,
  },
})

export const getters = {
  authenticationToken: state => state.authenticationToken,
}

export const mutations = {
  updateUser: (state, { isAuthenticated, username, identifier }) => {
    Object.assign(state.user, {
      isAuthenticated,
      username,
      identifier,
    })
  },

  setAuthenticationToken: (state, {token, user}) => {
    // Ensure that we don't store tokens / user data on the server
    if (!process.browser) return

    // TODO: Use expiry header information from when token was obtained to detect
    //       the expiration timeout.

    const expiry = moment().add(14, 'days')
    document.cookie = cookies(document.cookie, 'authentication:token', token, expiry.toDate(), '/')
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
