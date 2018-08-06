import moment from 'moment'

import { Metanic } from '~/clients/metanic'
import cookies from '~/helpers/cookies'

const metanic = new Metanic()

export const state = () => ({
  authentication: {},
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

  updateAuthenticationToken: (state, token) => {
    state.authentication.token = token

    if (process.browser) {
      // Delete cookie so that it doesn't become a list
      document.cookie = cookies(document.cookie, 'authentication:token', '', cookies.DELETE, '/')

      // TODO: Use expiry header information from when token was obtained to detect
      //       the expiration timeout.
      const expiry = moment().add(14, 'days')
      document.cookie = cookies(document.cookie, 'authentication:token', token, expiry.toDate(), '/')
    }
  },
}

export const actions = {
  nuxtServerInit: context => {},

  // Functions for working with data in services
  createPost: (store, body) => Metanic.FromStore(store).post('post', {body}),
  updatePost: (store, body) => Metanic.FromStore(store).put('post', body.local_reference, {body}),

  // Utility functions for authentication & authorization
  authenticate({ commit }, data) {
    metanic.post('jwt', 'obtain', {body: data})
      .then(({ data, metadata }) => {
        commit('updateAuthenticationToken', data.token)
        commit('updateUser', metadata.user)
      })
  },
}
