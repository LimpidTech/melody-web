import { compose, withState, pure } from 'recompose'

import { connect } from 'react-redux'
import EventSource from 'components/EventSource'

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    collectionItems: [],
  }
}

export default compose(
  EventSource('collections:retrieve'),
  connect(mapStateToProps),
)
