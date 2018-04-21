export default ({
  isAuthenticated(state) {
    return state.authentications && state.authentications.length > 0
  }
})
