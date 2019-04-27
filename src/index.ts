import App from './server'

class Index {
  private PORT: number

  constructor(port: number = 4000) {
    this.PORT = port
    console.log(`🚀 Server ready at http://localhost:${this.PORT}/graphql`)
  }

  start() {
    App.listen(this.PORT)
  }
}

new Index().start()
