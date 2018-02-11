import melody from 'clients/melody'

function retrieveCollections (name) {
  return melody.get('collection', name)
}

export default {
  'collections:retrieve': retrieveCollections
}
