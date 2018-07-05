import { Metanic } from '~/clients/metanic'

import cookies from '~/helpers/cookies'

function initializeAuthorization({ req, store }) {
  const cookieData = cookies(req.headers.cookie)
  const token = cookieData['authentication:token']
  if (!token) { return }
  store.commit('updateAuthenticationToken', token)
}

function getInitalPageData(asyncData, context) {
  /** Ensure cookies are in state. **/

  initializeAuthorization(context)

  const options = {}
  const metanic = Metanic.FromStore(context.store)

  // TODO: Wrap asyncData into this.
  return metanic.get('collection', 'recent_posts', options)
    .then(metanic.applyMeta(context))
    .then(({ data }) => ({collection: data}))
    .catch(err => { throw err })
}

export default function createPage(page) {
  page.asyncData = getInitalPageData.bind(this, page.asyncData)
  return page
}
