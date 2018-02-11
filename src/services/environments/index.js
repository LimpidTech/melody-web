export default class ReactRenderingService {
  options: Object
  render: Function
  service: Object

  constructor (render: Function, options: Object = {}) {
    this.options = options
    this.render = render
    this.createServer()
  }

  createServer () {
    throw new Error(
      'createServer must be implemented on ReactRenderingService subclasses.'
    )
  }

  setService (service: Object) {
    this.service = service
    this.listen(this.options.port)
    return this.service
  }

  handleRequest (request: Object, response: Object) {
    this.render(request)
      .catch(err => {
        console.error(`Rendering failed: ${err}`)
        response.writeHead(500, {'Content-Type': 'text/html'})
        response.end()
      })
  }

  listen (port: number) {
    this.service.listen(process.env.PORT || port || 3030)
  }
}
