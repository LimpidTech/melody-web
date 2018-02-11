import { compose, withState } from 'recompose'
import { connect } from 'react-redux'

function mapStateToProps (state, ownProps) {
  return {
    environment: state.environment,
    ...ownProps
  }
}

export default compose(
  withState('responseData', 'setResponseData', null),
  connect(mapStateToProps)
)
