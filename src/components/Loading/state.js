import { connect } from 'react-redux'

function mapStateToProps (state, ...ownProps) {
  return {
    environment: state.environment,
    ...ownProps
  }
}

export default connect(mapStateToProps)
