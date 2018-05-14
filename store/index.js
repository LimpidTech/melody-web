import { Metanic } from '~/clients/metanic'

const metanic = new Metanic()

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
