import actions from './actions'
import getters from './getters'
import modules from './modules'
import mutations from './mutations'
import state from './state'

console.log({
  state,
  actions,
  getters,
  mutations,
  modules,
  namespaced: true
})

export default {
  state,
  actions,
  getters,
  mutations,
  modules,
  namespaced: true
}
