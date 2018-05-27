export default class Cookie {
  constructor(cookies) {
    if (typeof cookies === 'undefined' && process.env.VUE_ENV !== 'server') {
      cookies = document.cookie
    }

    this.cookies = this.parse(cookies)
  }

  parse(cookies) {
    const result = {}

    let current = {key: '', value: ''}
    let key = true

    cookies = decodeURIComponent(cookies) + ';'

    for (const character of cookies) {
      if (key) {
        if (character === '=' && key === true) key = false
        else current.key += character
        continue
      }

      if (character === ';') {
        result[current.key.trim()] = current.value.trim()
        current.key = current.value = ''
        key = true
        continue
      }

      current.value += character
    }

    return result
  }

  all() {
    return this.cookies
  }

  get(key) {
    return this.all()[key]
  }

  set(key) {
    throw new Error('Not yet implemented.')
  }
}
