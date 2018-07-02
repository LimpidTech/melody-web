import cookies from '~/helpers/cookies'

import { Metanic } from '~/clients/metanic'

function getInitalPageData(asyncData, context) {
  // Use cookies to pull authentication information during
  // server-side rendering, so that we can render the user's
  // proper page content without client-side XHR.
  const cookieData = cookies(context.req.headers.cookie)
  const options = {}

  const metanic = new Metanic(cookieData['authentication:token'])

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
