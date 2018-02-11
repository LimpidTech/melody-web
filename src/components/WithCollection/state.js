import { compose } from 'recompose'

import { connect } from 'react-redux'
import EventSource from 'components/EventSource'
import withResponseData from 'components/WithResponseData'

function mapStateToProps (state, ownProps) {
  return {
    ...ownProps,
    collectionItems: []
  }
}

export default compose(
  EventSource('collections:retrieve'),
  connect(mapStateToProps),
  withResponseData('collection/recent_posts')
)
