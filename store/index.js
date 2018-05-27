import cookie from 'js-cookie'

import { Metanic } from '~/clients/metanic'

const metanic = new Metanic()

export const state = () => ({})

export const getters = {
  authenticationToken: state => state.authenticationToken,
}

export const mutations = {
  setAuthenticationToken: (state, token) => {
    if (!process.browser) return
    cookie.set('authentication:token', token)
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
