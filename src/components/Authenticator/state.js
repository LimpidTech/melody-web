import EventSource from 'components/EventSource'

import { compose, withState } from 'recompose'

export default compose(
  withState('username', 'setUsername', ''),
  withState('password', 'setPassword', ''),
  EventSource('authentication:authenticate')
)
