const COOKIE_EXPIRATION_DAYS = 45

function getExpirationTime() {
  const date = new Date()
  const deltaTime = COOKIE_EXPIRATION_DAYS * 24 * 60 * 60 * 1000
  date.setTime(date.getTime() + deltaTime)
  return date
}

function objectToCookieString(object) {
  let result = ''
  for (const key of Object.keys(object)) {
    const value = object[key]
    if (typeof value === 'undefined') { continue }
    result += key + '=' + (value || '') + '; expires=' + getExpirationTime() + '; path=/'
  }
  return result
}

export default function parse(cookies, subject, setValue) {
  cookies = cookies || ''

  const result = {}

  let current = {key: '', value: ''}
  let key = true

  for (const character of cookies) {
    if (key === true) {
      if (character === '=') key = false
      else current.key += character
      continue
    } else {
      if (character === ';') {
        result[current.key.trim()] = current.value.trim()
        current.key = current.value = ''
        key = true
      } else {
        current.value += character
      }
    }
  }

  if (current.key) {
    result[current.key] = current.value
  }

  if (typeof subject === 'undefined') {
    return result
  }

  if (typeof setValue === 'undefined') {
    return result[subject]
  }

  result[subject] = setValue
  return objectToCookieString(result)
}
