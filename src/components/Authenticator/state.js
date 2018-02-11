import EventSource from 'components/EventSource'

import { compose, withState } from 'recompose'
import { connect } from 'react-redux'

function mapStateToProps (state, ownProps) {
  return {
    ...ownProps,
    melodyUrl: state.services.melody
  }
}

export default compose(
  connect(mapStateToProps),
  withState('username', 'setUsername', ''),
  withState('password', 'setPassword', ''),
  EventSource('authentication:authenticate')
)
