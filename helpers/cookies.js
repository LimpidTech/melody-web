export default function parse(cookies) {
  const result = {}

  let current = {key: '', value: ''}
  let key = true;

  for (const character of cookies) {
    if (key) {
      if (character === '=') key = false
      else current.key += character
      continue
    } else {
      if (character === ';') {
        result[current.key.trim()] = current.value.trim()
        current.key = current.value = ''
        key = true;
      } else {
        current.value += character;
      }
    }
  }

  return result
}
