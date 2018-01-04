export function withValue (fn) {
  return evt => fn(evt.target.value)
}

export function preventDefault (fn) {
  return (evt, ...args) => {
    evt.preventDefault()
    fn(evt, ...args)
  }
}
