import metanic from '~/clients/metanic'

export const state = () => ({})

export const mutations = {}

export const actions = {
  nuxtServerInit: context => {},

  'account/authenticate': (identifer, secret) => metanic.post('authentication', {
    body: {
      username: this.username,
      password: secret,
    },
  }),
}
