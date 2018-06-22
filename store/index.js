import moment from 'moment'

import { Metanic } from '~/clients/metanic'
import cookies from '~/helpers/cookies'

const metanic = new Metanic()

export const state = () => ({})

export const getters = {
  authenticationToken: state => state.authenticationToken,
}

export const mutations = {
  setAuthenticationToken: (state, token) => {
    if (!process.browser) return
    const expiry = moment().add(14, 'days')
    document.cookie = cookies(document.cookie, 'authentication:token', token, expiry.toDate(), '/')
    state.authenticationToken = token
  },
}

export const actions = {
  nuxtServerInit: context => {},
  authenticate: ({ commit }, data) => {
    metanic.post('jwt', 'obtain', {body: data})
      .then(({ data }) => {
        commit('setAuthenticationToken', data.token)
      })
  },
}
