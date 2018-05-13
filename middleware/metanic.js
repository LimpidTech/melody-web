import metanic from '~/clients/metanic'

export default context => metanic.set('root', context.env.metanic.servicesUrl)
