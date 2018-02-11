import { compose, withState } from 'recompose'

export default compose(
  withState('size', 'setSize', 3)
)
