import { Metanic } from '~/clients/metanic'

import cookies from '~/helpers/cookies'

function initializeAuthorization({ req, store }) {
  if (!req) { return }

  const cookieData = cookies(req.headers.cookie)
  const token = cookieData['authentication:token']

  if (!token) { return }
  store.commit('updateAuthenticationToken', token)
}

function getInitalPageData(asyncData, context) {
  initializeAuthorization(context)

  const metanic = Metanic.FromStore(context.store)

  const user = metanic.get('user', 'current')
    .then(metanic.applyMeta(context))
    .catch(() => {})

  if (!asyncData) { return }

  return user.then(() => asyncData(context))
}

export default function createPage(page) {
  page.asyncData = getInitalPageData.bind(this, page.asyncData)
  return page
}
