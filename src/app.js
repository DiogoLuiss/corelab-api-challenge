import routes from './routes'
import express from 'express'
import { resolve } from 'path'
import cors from 'cors'
import './database'

class App {
  constructor () {
    this.app = express()

    this.app.use(cors()) // serve para dar permissão para aplicações usar a api
    this.middlewares()
    this.router()
  }

  middlewares () {
    this.app.use(express.json())
    this.app.use(
      '/cars-file',
      express.static(resolve(__dirname, '..', 'uploads'))
    )
  }

  router () {
    this.app.use(routes)
  }
}

export default new App().app
